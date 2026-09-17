import { clipExcerpt, type Evidence, type ScoreInput } from "./domain";
import {
  emptyLabelScores,
  RISK_KINDS,
  type NeuralBackend,
  type RiskKind,
} from "./kinds";
import {
  GLICLASS_LABELS,
  JEV_PRIMARY_CHOICE,
  JEV_SEVERITY_SCORE,
  type LabelSpec,
} from "./taxonomy";

export type { NeuralBackend };

export type NeuralLayer = {
  backend: NeuralBackend;
  model: string;
  confidence: number | null;
  evidence: Evidence[];
  severity: number | null;
  error?: string;
};

export type NoulQuestion = {
  type: "noul";
  instructions: string;
  criteria: { true: string; false: string };
};

export type ChoiceQuestion = {
  type: "choice";
  instructions: string;
  criteria: Record<string, string>;
};

export type ScoreQuestion = {
  type: "score";
  instructions: string;
  criteria: string[];
};

export type JevQuestion = NoulQuestion | ChoiceQuestion | ScoreQuestion;

export type NoulAnswer = { type: "noul"; noul: number };
export type ChoiceAnswer = {
  type: "choice";
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
};
export type ScoreAnswer = {
  type: "score";
  score: number;
  legend: Record<string, string>;
  probabilities: Record<string, number>;
  confidence: number;
};
export type JevAnswer = NoulAnswer | ChoiceAnswer | ScoreAnswer;

export type SystemOneResult = {
  model: string;
  answers: Record<string, JevAnswer>;
};

const FIELD_LIMIT = 4000;
const STATE_LIMIT = 12000;
const JEV_TIMEOUT_MS = 2000;
const NOUL_FIRE = 0.36;

function clip(text: string, max = FIELD_LIMIT): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

export function packState(input: ScoreInput): Record<string, unknown> {
  const state: Record<string, unknown> = { stage: input.stage };
  if (input.prompt) state.prompt = clip(input.prompt);
  if (input.thought) state.thought = clip(input.thought);
  if (input.toolName || input.toolInput || input.path) {
    state.tool = {
      name: input.toolName ?? null,
      input: input.toolInput ? clip(input.toolInput) : null,
      path: input.path ?? null,
    };
  }
  if (input.patch) state.patch = clip(input.patch);
  if (input.transcript) state.transcript = clip(input.transcript, 6000);
  const encoded = JSON.stringify(state);
  if (encoded.length <= STATE_LIMIT) return state;
  if (typeof state.transcript === "string") {
    state.transcript = clip(String(state.transcript), 2000);
  }
  if (typeof state.patch === "string") {
    state.patch = clip(String(state.patch), 1500);
  }
  return state;
}

function noulQuestion(spec: LabelSpec): NoulQuestion {
  return {
    type: "noul",
    instructions: spec.jev.instructions,
    criteria: { true: spec.jev.true, false: spec.jev.false },
  };
}

export function jevQuestions(): Record<string, JevQuestion> {
  const questions: Record<string, JevQuestion> = {};
  for (const spec of GLICLASS_LABELS) {
    questions[spec.kind] = noulQuestion(spec);
  }
  questions.primary = {
    type: "choice",
    instructions: JEV_PRIMARY_CHOICE.instructions,
    criteria: { ...JEV_PRIMARY_CHOICE.criteria },
  };
  questions.severity = {
    type: "score",
    instructions: JEV_SEVERITY_SCORE.instructions,
    criteria: [...JEV_SEVERITY_SCORE.criteria],
  };
  return questions;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseProbabilities(value: unknown): Record<string, number> {
  if (!isRecord(value)) return {};
  const out: Record<string, number> = {};
  for (const [key, item] of Object.entries(value)) {
    const num = asNumber(item);
    if (num !== null) out[key] = num;
  }
  return out;
}

function parseAnswer(raw: unknown): JevAnswer | null {
  if (!isRecord(raw)) return null;
  const type = asString(raw.type);
  if (type === "noul") {
    const noul = asNumber(raw.noul);
    if (noul === null) return null;
    return { type: "noul", noul };
  }
  if (type === "choice") {
    const choice = asString(raw.choice);
    const confidence = asNumber(raw.confidence);
    if (choice === null || confidence === null) return null;
    return {
      type: "choice",
      choice,
      probabilities: parseProbabilities(raw.probabilities),
      confidence,
    };
  }
  if (type === "score") {
    const score = asNumber(raw.score);
    const confidence = asNumber(raw.confidence);
    if (score === null || confidence === null) return null;
    const legendRaw = isRecord(raw.legend) ? raw.legend : {};
    const legend: Record<string, string> = {};
    for (const [key, item] of Object.entries(legendRaw)) {
      const text = asString(item);
      if (text !== null) legend[key] = text;
    }
    return {
      type: "score",
      score,
      legend,
      probabilities: parseProbabilities(raw.probabilities),
      confidence,
    };
  }
  return null;
}

export function parseSystemOneResult(raw: unknown): SystemOneResult {
  if (!isRecord(raw)) {
    throw new Error("TypeSafe response was not an object.");
  }
  const model = asString(raw.model) ?? "unknown";
  const answersRaw = isRecord(raw.answers) ? raw.answers : {};
  const answers: Record<string, JevAnswer> = {};
  for (const [id, item] of Object.entries(answersRaw)) {
    const parsed = parseAnswer(item);
    if (parsed) answers[id] = parsed;
  }
  return { model, answers };
}

export function isRiskKind(value: string): value is RiskKind {
  return (RISK_KINDS as readonly string[]).includes(value);
}

export function neuralFromJev(result: SystemOneResult): NeuralLayer {
  const evidence: Evidence[] = [];
  const labels = emptyLabelScores();
  for (const spec of GLICLASS_LABELS) {
    const answer = result.answers[spec.kind];
    if (!answer || answer.type !== "noul") continue;
    labels[spec.kind] = answer.noul;
    if (answer.noul < NOUL_FIRE) continue;
    evidence.push({
      kind: spec.kind,
      detectorId: `jev:noul:${spec.kind}`,
      weight: Number(answer.noul.toFixed(3)),
      excerpt: clipExcerpt(spec.jev.instructions, 120),
      why: `Jev noul ${answer.noul.toFixed(2)} on "${spec.jev.instructions}"`,
    });
  }

  let confidence: number | null = null;
  const primary = result.answers.primary;
  if (primary && primary.type === "choice") {
    confidence = primary.confidence;
    if (isRiskKind(primary.choice) && primary.confidence >= 0.5) {
      const p = primary.probabilities[primary.choice] ?? primary.confidence;
      labels[primary.choice] = Math.max(labels[primary.choice], p);
      if (p >= NOUL_FIRE) {
        evidence.push({
          kind: primary.choice,
          detectorId: "jev:choice:primary",
          weight: Number(p.toFixed(3)),
          excerpt: primary.choice,
          why: `Jev primary choice ${primary.choice} (confidence ${primary.confidence.toFixed(2)}).`,
        });
      }
    }
  }

  let severity: number | null = null;
  const scored = result.answers.severity;
  if (scored && scored.type === "score") {
    severity = scored.score;
  }

  evidence.sort((a, b) => b.weight - a.weight);
  return {
    backend: "jev",
    model: result.model,
    confidence,
    evidence,
    severity,
  };
}

export async function callJev(
  state: Record<string, unknown>,
  questions: Record<string, JevQuestion>
): Promise<SystemOneResult> {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    throw new Error("TYPESAFE_API_KEY is not set.");
  }
  const endpoint =
    process.env.TYPESAFE_ENDPOINT ?? "https://api.typesafe.ai/v1/systemone";
  const model = process.env.TYPESAFE_MODEL ?? "jev-1.13.0";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), JEV_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state, model, questions }),
      signal: controller.signal,
    });
    const body: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(`TypeSafe HTTP ${response.status}`);
    }
    return parseSystemOneResult(body);
  } finally {
    clearTimeout(timer);
  }
}
