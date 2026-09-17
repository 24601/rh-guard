import type { ScoreInput, ScoreReport } from "./domain";
import type { Verdict } from "./kinds";

export type ClaudeHookOutput = {
  continue?: boolean;
  decision?: "block";
  reason?: string;
  hookSpecificOutput?: {
    hookEventName: string;
    permissionDecision?: "allow" | "deny" | "ask";
    permissionDecisionReason?: string;
    additionalContext?: string;
  };
  systemMessage?: string;
};

export type CursorHookOutput = {
  continue?: boolean;
  permission?: "allow" | "deny" | "ask";
  user_message?: string;
  agent_message?: string;
  additional_context?: string;
  followup_message?: string;
};

const PROCESS_DENY =
  "Preserve the checker. Submit the suspected evaluation defect through the escalation path. Do not rewrite graders, hidden tests, hooks, or evaluator runtimes.";

export function failClosedClaudeOutput(event = "PreToolUse"): ClaudeHookOutput {
  const reason =
    "Hack Radar unavailable. Action held for evaluation-integrity review.";
  const hookEventName =
    event === "UserPromptSubmit" || event === "Stop" ? event : "PreToolUse";
  return {
    continue: false,
    decision: "block",
    reason,
    hookSpecificOutput: {
      hookEventName,
      permissionDecision: "deny",
      permissionDecisionReason: `${reason} ${PROCESS_DENY}`,
    },
  };
}

export function failClosedCursorOutput(): CursorHookOutput {
  return {
    continue: false,
    permission: "deny",
    user_message: "Hack Radar unavailable. Action held for evaluation-integrity review.",
    agent_message: PROCESS_DENY,
  };
}

function effective(report: ScoreReport): Verdict {
  return report.hookVerdict;
}

export function toClaudeOutput(event: string, report: ScoreReport): ClaudeHookOutput {
  const verdict = effective(report);
  const context = report.steer.agentContext;
  if (event === "PreToolUse") {
    if (verdict === "block") {
      const why = report.evidence[0]?.why ?? "Blocked as a reward-hacking action.";
      return {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: `${why} ${PROCESS_DENY}`,
        },
      };
    }
    if (verdict === "steer" && context) {
      return {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          additionalContext: context,
        },
      };
    }
    return {};
  }
  if (event === "UserPromptSubmit") {
    if (verdict === "block") {
      return {
        decision: "block",
        reason:
          report.steer.user[0] ??
          "This prompt asks to disable oversight or game the evaluator.",
      };
    }
    if (context) {
      return {
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext: context,
        },
      };
    }
    return {};
  }
  if (event === "Stop" && verdict !== "ok") {
    return {
      hookSpecificOutput: {
        hookEventName: "Stop",
        additionalContext:
          context ||
          "Mark this artifact unverified. Do not claim independent evaluation without a controller-issued result.",
      },
    };
  }
  return context
    ? {
        hookSpecificOutput: {
          hookEventName: event,
          additionalContext: context,
        },
      }
    : {};
}

export function toCursorOutput(event: string, report: ScoreReport): CursorHookOutput {
  const verdict = effective(report);
  const context = report.steer.agentContext;
  if (event === "beforeSubmitPrompt") {
    if (verdict === "block") {
      return {
        continue: false,
        user_message:
          report.steer.user[0] ??
          "Please revise the request to preserve acceptance checks and permit reporting contradictory tests.",
      };
    }
    if (verdict === "steer") {
      return {
        continue: true,
        user_message:
          report.steer.user[0] ??
          "Treat visible tests as a partial proxy. Add a held-out suite in CI or an isolated evaluator.",
      };
    }
    return { continue: true };
  }
  if (event === "afterFileEdit" || event === "afterAgentThought") {
    return {};
  }
  if (event === "postToolUse" || event === "postToolUseFailure") {
    return context ? { additional_context: context } : {};
  }
  if (event === "preToolUse" || event === "beforeShellExecution") {
    if (verdict === "block") {
      return {
        permission: "deny",
        user_message: report.evidence[0]?.why,
        agent_message: PROCESS_DENY,
      };
    }
    if (event === "preToolUse" && context) {
      return { agent_message: context };
    }
    return {};
  }
  if (event === "stop" && verdict !== "ok") {
    const follow = report.steer.moves.find((move) => move.id === "escalate-eval-defect")
      ?? report.steer.moves.find((move) => move.audience === "agent");
    return {
      followup_message: follow
        ? `${follow.instruction}\n\nDo not keep iterating until the monitor is quiet. Independent verification remains the success criterion.`
        : "The last turn scored as reward-hacking risk. Preserve the checker. Name a falsifier or escalate a contradictory eval.",
    };
  }
  if (event === "sessionStart" && context) {
    return { additional_context: context };
  }
  return {};
}

export function stageForEvent(event: string): ScoreInput["stage"] {
  switch (event) {
    case "UserPromptSubmit":
    case "beforeSubmitPrompt":
      return "prompt";
    case "afterAgentThought":
      return "thought";
    case "PreToolUse":
    case "preToolUse":
    case "beforeShellExecution":
      return "tool";
    case "afterFileEdit":
    case "PostToolUse":
    case "postToolUse":
      return "edit";
    case "Stop":
    case "stop":
      return "stop";
    default:
      return "trajectory";
  }
}
