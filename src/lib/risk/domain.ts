import type { NeuralBackend, PolicyMode, RiskKind, Stage, Verdict } from "./kinds";

export type Evidence = {
  kind: RiskKind;
  detectorId: string;
  weight: number;
  excerpt: string;
  why: string;
};

export type VerifierMove = {
  id: string;
  title: string;
  audience: "user" | "agent";
  instruction: string;
};

export type ScoreInput = {
  stage: Stage;
  prompt?: string;
  thought?: string;
  toolName?: string;
  toolInput?: string;
  path?: string;
  patch?: string;
  transcript?: string;
};

export type SteerAdvice = {
  user: string[];
  agentContext: string;
  moves: VerifierMove[];
};

export type ScoreReport = {
  stage: Stage;
  overall: number;
  verdict: Verdict;
  hookVerdict: Verdict;
  mode: PolicyMode;
  structuralDeny: boolean;
  labels: Record<RiskKind, number>;
  evidence: Evidence[];
  steer: SteerAdvice;
  backend: NeuralBackend;
  model: string;
  confidence: number | null;
  severity: number | null;
  falsifierNamed: number | null;
  primaryKind: string | null;
  skippedReason?: string;
  neuralError?: string;
};

export type ParsedHookEvent = {
  source: "claude" | "cursor" | "grok" | "generic" | "raw";
  event: string;
  input: ScoreInput;
  raw: unknown;
};

export function blob(input: ScoreInput): string {
  return [
    input.prompt,
    input.thought,
    input.toolName,
    input.toolInput,
    input.path,
    input.patch,
    input.transcript,
  ]
    .filter((part): part is string => Boolean(part && part.trim()))
    .join("\n");
}

export function clipExcerpt(text: string, max = 180): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) {
    return compact;
  }
  return `${compact.slice(0, max - 1)}…`;
}
