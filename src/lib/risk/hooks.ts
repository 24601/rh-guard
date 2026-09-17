import type { ScoreInput, ScoreReport } from "./domain";

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
  additional_context?: string;
  followup_message?: string;
};

export function toClaudeOutput(event: string, report: ScoreReport): ClaudeHookOutput {
  const context = report.steer.agentContext;
  if (event === "PreToolUse") {
    if (report.verdict === "block") {
      return {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason:
            report.evidence[0]?.why ?? "Blocked as a reward-hacking action.",
        },
      };
    }
    if (context) {
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
    if (report.verdict === "block") {
      return {
        decision: "block",
        reason: report.steer.user[0] ?? "This prompt is scored as a reward-hackable eval.",
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
  if (event === "Stop" && report.verdict !== "ok") {
    return {
      hookSpecificOutput: {
        hookEventName: "Stop",
        additionalContext: context,
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
  const context = report.steer.agentContext;
  if (event === "beforeSubmitPrompt") {
    if (report.verdict === "block") {
      return {
        continue: false,
        user_message:
          report.steer.user[0] ??
          "Hack Radar blocked this prompt because the eval is a gameable proxy.",
      };
    }
    return { continue: true };
  }
  if (
    event === "preToolUse" ||
    event === "beforeShellExecution" ||
    event === "afterFileEdit"
  ) {
    if (report.verdict === "block") {
      return {
        permission: "deny",
        user_message: report.evidence[0]?.why,
      };
    }
    if (event === "preToolUse" && context) {
      return { permission: "allow", additional_context: context };
    }
    return { permission: "allow" };
  }
  if (event === "stop" && report.verdict !== "ok") {
    const follow = report.steer.moves.find((move) => move.audience === "agent");
    return {
      followup_message: follow
        ? `${follow.instruction}\n\nDo not edit tests. Implement the behavior, then propose a falsifier.`
        : "The last turn scored as reward-hacking risk. Do not edit tests. Add a falsifier and a general implementation.",
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
