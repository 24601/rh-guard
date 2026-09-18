import { assertNever } from "./kinds";
import type { ScoreReport } from "./domain";
import type { Verdict } from "./kinds";
import { AGENT_DENY } from "./steer";
import {
  failClosedClaudeOutput,
  failClosedCursorOutput,
  isPreExecuteEvent,
  toClaudeOutput,
  toCursorOutput,
  type ClaudeHookOutput,
  type CursorHookOutput,
} from "./hooks";

export const HOOK_FLAVORS = [
  "claude",
  "cursor",
  "grok",
  "generic",
  "codex",
  "dsh",
  "exo",
  "pi",
  "prime",
  "amp",
] as const;

export type HookFlavor = (typeof HOOK_FLAVORS)[number];

export type CanonicalFlavor =
  | "claude"
  | "cursor"
  | "grok"
  | "generic"
  | "pi"
  | "prime"
  | "amp"
  | "codex";

export type PiHookOutput =
  | { block: true; reason: string; terminate?: true }
  | Record<string, never>;

export type AmpHookOutput =
  | { action: "allow" }
  | { action: "reject-and-continue"; message: string };

export type GrokHookOutput = { decision?: "deny"; reason?: string };

export type GenericHookOutput = {
  block: boolean;
  reason?: string;
};

export type HostHookOutput =
  | ClaudeHookOutput
  | CursorHookOutput
  | PiHookOutput
  | AmpHookOutput
  | GrokHookOutput
  | GenericHookOutput;

export function isHookFlavor(value: string): value is HookFlavor {
  return (HOOK_FLAVORS as readonly string[]).includes(value);
}

export function parseHookFlavor(value: string | undefined): HookFlavor | undefined {
  if (!value) return undefined;
  return isHookFlavor(value) ? value : undefined;
}

export function canonicalFlavor(flavor: HookFlavor): CanonicalFlavor {
  switch (flavor) {
    case "dsh":
    case "exo":
      return "generic";
    case "claude":
    case "cursor":
    case "grok":
    case "generic":
    case "pi":
    case "prime":
    case "amp":
    case "codex":
      return flavor;
    default:
      return assertNever(flavor);
  }
}

export function httpEnabled(flavor: HookFlavor): boolean {
  switch (flavor) {
    case "claude":
    case "cursor":
    case "grok":
    case "generic":
    case "pi":
    case "prime":
    case "amp":
    case "exo":
      return true;
    case "codex":
    case "dsh":
      return false;
    default:
      return assertNever(flavor);
  }
}

function verdictOf(report: ScoreReport): Verdict {
  return report.hookVerdict;
}

export function failClosedPiOutput(): PiHookOutput {
  return { block: true, reason: AGENT_DENY, terminate: true };
}

export function failClosedPrimeOutput(): PiHookOutput {
  return { block: true, reason: AGENT_DENY };
}

export function failClosedAmpOutput(): AmpHookOutput {
  return { action: "reject-and-continue", message: AGENT_DENY };
}

export function failClosedGrokOutput(): GrokHookOutput {
  return { decision: "deny", reason: AGENT_DENY };
}

export function failClosedGenericOutput(): GenericHookOutput {
  return { block: true, reason: AGENT_DENY };
}

export function failClosedCodexOutput(): ClaudeHookOutput {
  return {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: AGENT_DENY,
    },
  };
}

export function failClosedHostOutput(flavor: HookFlavor): HostHookOutput {
  const canonical = canonicalFlavor(flavor);
  switch (canonical) {
    case "codex":
      return failClosedCodexOutput();
    case "claude":
      return failClosedClaudeOutput("PreToolUse");
    case "cursor":
      return failClosedCursorOutput();
    case "grok":
      return failClosedGrokOutput();
    case "generic":
      return failClosedGenericOutput();
    case "pi":
      return failClosedPiOutput();
    case "prime":
      return failClosedPrimeOutput();
    case "amp":
      return failClosedAmpOutput();
    default:
      return assertNever(canonical);
  }
}

export function failClosedExitCode(flavor: HookFlavor): number {
  const canonical = canonicalFlavor(flavor);
  switch (canonical) {
    case "cursor":
      return 1;
    case "claude":
    case "codex":
    case "grok":
    case "generic":
    case "pi":
    case "prime":
    case "amp":
      return 2;
    default:
      return assertNever(canonical);
  }
}

export function successExitCode(
  flavor: HookFlavor,
  event: string,
  report: ScoreReport
): number {
  const canonical = canonicalFlavor(flavor);
  const blocked = verdictOf(report) === "block";
  switch (canonical) {
    case "codex":
      return blocked && isCodexBlockingEvent(event) ? 2 : 0;
    case "grok":
      return blocked && isGrokBlockingEvent(event) ? 2 : 0;
    case "generic":
      return blocked ? 2 : 0;
    case "claude":
      // Claude Code honours the deny JSON at exit 0. The DeepSeek Harness
      // bridge that reuses this wrapper only fails closed on a non-zero exit.
      return blocked && isPreExecuteEvent(event) ? 2 : 0;
    case "cursor":
    case "pi":
    case "prime":
    case "amp":
      return 0;
    default:
      return assertNever(canonical);
  }
}

function isGrokBlockingEvent(event: string): boolean {
  return (
    event === "PreToolUse" ||
    event === "preToolUse" ||
    event === "pre_tool_use" ||
    event === "tool_call" ||
    event === "tool.call" ||
    isPreExecuteEvent(event)
  );
}

function isCodexBlockingEvent(event: string): boolean {
  return isGrokBlockingEvent(event);
}

export function toPiOutput(report: ScoreReport): PiHookOutput {
  if (verdictOf(report) === "block") {
    return { block: true, reason: AGENT_DENY, terminate: true };
  }
  return {};
}

export function toPrimeOutput(report: ScoreReport): PiHookOutput {
  if (verdictOf(report) === "block") {
    return { block: true, reason: AGENT_DENY };
  }
  return {};
}

export function toAmpOutput(report: ScoreReport): AmpHookOutput {
  if (verdictOf(report) === "block") {
    return { action: "reject-and-continue", message: AGENT_DENY };
  }
  return { action: "allow" };
}

export function toGrokOutput(event: string, report: ScoreReport): GrokHookOutput {
  if (verdictOf(report) === "block" && isGrokBlockingEvent(event)) {
    return { decision: "deny", reason: AGENT_DENY };
  }
  return {};
}

export function toGenericOutput(report: ScoreReport): GenericHookOutput {
  if (verdictOf(report) === "block") {
    return { block: true, reason: AGENT_DENY };
  }
  return { block: false };
}

export function toCodexOutput(event: string, report: ScoreReport): ClaudeHookOutput {
  if (isCodexBlockingEvent(event)) {
    return toClaudeOutput("PreToolUse", report);
  }
  return {};
}

export function toHostOutput(
  flavor: HookFlavor,
  event: string,
  report: ScoreReport
): HostHookOutput {
  const canonical = canonicalFlavor(flavor);
  switch (canonical) {
    case "codex":
      return toCodexOutput(event, report);
    case "claude":
      return toClaudeOutput(event, report);
    case "cursor":
      return toCursorOutput(event, report);
    case "grok":
      return toGrokOutput(event, report);
    case "generic":
      return toGenericOutput(report);
    case "pi":
      return toPiOutput(report);
    case "prime":
      return toPrimeOutput(report);
    case "amp":
      return toAmpOutput(report);
    default:
      return assertNever(canonical);
  }
}
