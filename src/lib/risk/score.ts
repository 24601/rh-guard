import { blob, type Evidence, type ScoreInput, type ScoreReport } from "./domain";
import { runDetectors } from "./detectors";
import {
  callJev,
  jevQuestions,
  neuralFromJev,
  packState,
  skippedNeural,
  type NeuralLayer,
} from "./jev";
import { missingPromptFalsifier } from "./digest";
import {
  ADVISORY_KINDS,
  DENY_KINDS,
  REVIEW_THRESHOLD,
  assertNever,
  blockThreshold,
  emptyLabelScores,
  isDenyKind,
  parsePolicyMode,
  type PolicyMode,
  type RiskKind,
  type Verdict,
} from "./kinds";
import { AGENT_STEER, AGENT_STOP, agentVisibleContext, movesFor } from "./steer";
import { zeroshotLabels } from "./zeroshot";

function mergeEvidence(parts: Evidence[][]): Evidence[] {
  const best = new Map<string, Evidence>();
  for (const list of parts) {
    for (const item of list) {
      const key = `${item.kind}:${item.detectorId}`;
      const prev = best.get(key);
      if (!prev || item.weight > prev.weight) {
        best.set(key, item);
      }
    }
  }
  return [...best.values()].sort((a, b) => b.weight - a.weight);
}

function kindScores(evidence: Evidence[]): Record<RiskKind, number> {
  const labels = emptyLabelScores();
  for (const item of evidence) {
    labels[item.kind] = Math.max(labels[item.kind], item.weight);
  }
  return labels;
}

function maxOf(labels: Record<RiskKind, number>, kinds: readonly RiskKind[]): number {
  let max = 0;
  for (const kind of kinds) {
    max = Math.max(max, labels[kind] ?? 0);
  }
  return max;
}

function overallFrom(labels: Record<RiskKind, number>): number {
  let max = 0;
  for (const value of Object.values(labels)) {
    max = Math.max(max, value);
  }
  return Number(max.toFixed(3));
}

export function structuralWouldDeny(evidence: Evidence[]): boolean {
  return evidence.some(
    (item) => isDenyKind(item.kind) && item.weight >= blockThreshold(item.kind)
  );
}

function mutatingStage(stage: ScoreInput["stage"]): boolean {
  return (
    stage === "tool" ||
    stage === "edit" ||
    stage === "trajectory" ||
    stage === "stop"
  );
}

function denyHits(
  labels: Record<RiskKind, number>,
  kinds: readonly RiskKind[]
): boolean {
  for (const kind of kinds) {
    if (labels[kind] >= blockThreshold(kind)) return true;
  }
  return false;
}

function wouldVerdict(
  input: ScoreInput,
  labels: Record<RiskKind, number>,
  structuralDeny: boolean,
  semanticFailed: boolean,
  choiceConfidence: number | null
): Verdict {
  if (structuralDeny) return "block";

  const promptDenies: RiskKind[] = ["monitor_gaming", "process_evasion"];
  if (mutatingStage(input.stage) && denyHits(labels, DENY_KINDS)) {
    return "block";
  }
  if (input.stage === "prompt" && denyHits(labels, promptDenies)) {
    return "block";
  }
  if (semanticFailed && mutatingStage(input.stage)) {
    return "steer";
  }
  if (
    mutatingStage(input.stage) &&
    choiceConfidence !== null &&
    choiceConfidence < 0.5
  ) {
    return "steer";
  }
  if (missingPromptFalsifier(input)) {
    return "steer";
  }
  const advisoryMax = maxOf(labels, ADVISORY_KINDS);
  let anyMax = 0;
  for (const value of Object.values(labels)) {
    anyMax = Math.max(anyMax, value);
  }
  if (anyMax >= REVIEW_THRESHOLD || advisoryMax >= REVIEW_THRESHOLD) {
    return "steer";
  }
  return "ok";
}

export function hookVerdictFor(
  would: Verdict,
  mode: PolicyMode,
  structuralDeny: boolean
): Verdict {
  switch (mode) {
    case "shadow":
      return "ok";
    case "review":
      if (would === "block" && !structuralDeny) return "steer";
      return would;
    case "enforce":
      return would;
    default:
      return assertNever(mode);
  }
}

function agentContext(kinds: RiskKind[], stage: ScoreInput["stage"]): string {
  if (stage === "stop") return AGENT_STOP;
  if (kinds.length === 0) return AGENT_STEER;
  return agentVisibleContext(kinds);
}

export function lexicalNeural(haystack: string): NeuralLayer {
  return {
    backend: "lexical",
    model: "lexical-gliclass-shape",
    confidence: null,
    evidence: zeroshotLabels(haystack),
    severity: null,
    falsifierNamed: null,
    primaryKind: null,
  };
}

export async function collectNeural(
  input: ScoreInput,
  haystack: string
): Promise<NeuralLayer> {
  if (!process.env.TYPESAFE_API_KEY) {
    return lexicalNeural(haystack);
  }
  try {
    const result = await callJev(packState(input), jevQuestions());
    return neuralFromJev(result);
  } catch (err) {
    const fallback = lexicalNeural(haystack);
    const message = err instanceof Error ? err.message : "Jev call failed.";
    return { ...fallback, error: message };
  }
}

export function score(
  input: ScoreInput,
  neural?: NeuralLayer,
  mode: PolicyMode = "enforce"
): ScoreReport {
  const haystack = blob(input);
  const layer = neural ?? lexicalNeural(haystack);
  const structural = runDetectors(input, haystack);
  const structuralDeny = structuralWouldDeny(structural);
  const evidence = mergeEvidence([structural, layer.evidence]);
  const labels = kindScores(evidence);
  const overall = overallFrom(labels);
  const would = wouldVerdict(
    input,
    labels,
    structuralDeny,
    Boolean(layer.error),
    layer.confidence
  );
  const hookVerdict = hookVerdictFor(would, mode, structuralDeny);
  const activeKinds = (Object.entries(labels) as [RiskKind, number][])
    .filter(([, value]) => value >= REVIEW_THRESHOLD)
    .map(([kind]) => kind);
  const showSteer = would !== "ok";
  const moves = showSteer ? movesFor(activeKinds) : [];
  const user = moves
    .filter((move) => move.audience === "user")
    .map((move) => `${move.title}. ${move.instruction}`);
  return {
    stage: input.stage,
    overall,
    verdict: would,
    hookVerdict,
    mode,
    structuralDeny,
    labels,
    evidence,
    backend: layer.backend,
    model: layer.model,
    confidence: layer.confidence,
    severity: layer.severity,
    falsifierNamed: layer.falsifierNamed,
    primaryKind: layer.primaryKind,
    skippedReason: layer.skippedReason,
    neuralError: layer.error,
    steer: {
      user,
      agentContext: showSteer ? agentContext(activeKinds, input.stage) : "",
      moves,
    },
  };
}

export async function scoreEvent(
  input: ScoreInput,
  mode: PolicyMode = parsePolicyMode(
    process.env.RH_GUARD_MODE ?? process.env.HACK_RADAR_MODE
  )
): Promise<ScoreReport> {
  const haystack = blob(input);
  const structural = runDetectors(input, haystack);
  if (structuralWouldDeny(structural)) {
    return score(
      input,
      skippedNeural("structural deny; Jev would not change the decision"),
      mode
    );
  }
  const neural = await collectNeural(input, haystack);
  return score(input, neural, mode);
}
