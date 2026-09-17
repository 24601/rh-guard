export const RISK_KINDS = [
  "proxy_metric",
  "test_tampering",
  "hardcoded_oracle",
  "verifier_weakening",
  "process_evasion",
  "monitor_gaming",
  "heldout_blindness",
  "sycophancy_eval",
  "coverage_theater",
  "reward_tampering",
] as const;

export type RiskKind = (typeof RISK_KINDS)[number];

export const STAGES = [
  "prompt",
  "thought",
  "tool",
  "edit",
  "stop",
  "trajectory",
] as const;

export type Stage = (typeof STAGES)[number];

export type Verdict = "ok" | "steer" | "block";

export function emptyLabelScores(): Record<RiskKind, number> {
  return {
    proxy_metric: 0,
    test_tampering: 0,
    hardcoded_oracle: 0,
    verifier_weakening: 0,
    process_evasion: 0,
    monitor_gaming: 0,
    heldout_blindness: 0,
    sycophancy_eval: 0,
    coverage_theater: 0,
    reward_tampering: 0,
  };
}

export function assertNever(value: never): never {
  throw new Error(`unhandled variant: ${String(value)}`);
}

export function kindTitle(kind: RiskKind): string {
  switch (kind) {
    case "proxy_metric":
      return "Proxy metric";
    case "test_tampering":
      return "Test tampering";
    case "hardcoded_oracle":
      return "Hardcoded oracle";
    case "verifier_weakening":
      return "Verifier weakening";
    case "process_evasion":
      return "Process evasion";
    case "monitor_gaming":
      return "Monitor gaming";
    case "heldout_blindness":
      return "Held-out blindness";
    case "sycophancy_eval":
      return "Sycophantic eval";
    case "coverage_theater":
      return "Coverage theater";
    case "reward_tampering":
      return "Reward tampering";
    default:
      return assertNever(kind);
  }
}

export function kindBlurb(kind: RiskKind): string {
  switch (kind) {
    case "proxy_metric":
      return "The stated goal is a cheap proxy such as green tests, a rubric keyword, or a judge score.";
    case "test_tampering":
      return "The trajectory edits, skips, or deletes tests instead of changing the implementation.";
    case "hardcoded_oracle":
      return "The solution returns expected values for known cases instead of a general algorithm.";
    case "verifier_weakening":
      return "Assertions, mocks, or timeouts are relaxed so a broken implementation still scores.";
    case "process_evasion":
      return "Hooks, linters, or git checks are skipped so a failing gate never runs.";
    case "monitor_gaming":
      return "The agent hides intent from a monitor, prompt-injects a judge, or asks to turn the detector off.";
    case "heldout_blindness":
      return "The only checks are visible tests the agent can see and overwrite.";
    case "sycophancy_eval":
      return "The evaluator rewards agreement, politeness, or style over a falsifiable claim.";
    case "coverage_theater":
      return "Coverage numbers, snapshots, or logs are manufactured without exercising behavior.";
    case "reward_tampering":
      return "The reward function, scorer, or judge code is edited to pay out regardless of the task.";
    default:
      return assertNever(kind);
  }
}
