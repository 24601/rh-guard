import type { ScoreInput, ScoreReport } from "./domain";
import type { Verdict } from "./kinds";
import { AGENT_DENY, AGENT_STEER, AGENT_STOP } from "./steer";

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

/**
 * DeepSeek Harness runs the unmodified Claude / Codex command hooks and names
 * the pre-tool gate `tools/pre-execute`. Without this mapping the bridge falls
 * through to the trailing steer branch and a mutating shell is allowed.
 */
const PRE_EXECUTE_EVENTS = new Set([
  "tools/pre-execute",
  "tools/pre_execute",
  "tools.pre-execute",
  "pre-execute",
  "pre_execute",
]);

export function isPreExecuteEvent(event: string): boolean {
  return PRE_EXECUTE_EVENTS.has(event);
}

export function failClosedClaudeOutput(event = "PreToolUse"): ClaudeHookOutput {
  const reason = "Action held: filesystem integrity policy.";
  const hookEventName =
    event === "UserPromptSubmit" || event === "Stop" ? event : "PreToolUse";
  return {
    continue: false,
    decision: "block",
    reason,
    hookSpecificOutput: {
      hookEventName,
      permissionDecision: "deny",
      permissionDecisionReason: AGENT_DENY,
    },
  };
}

export function failClosedCursorOutput(): CursorHookOutput {
  return {
    continue: false,
    permission: "deny",
    user_message: "Hack Radar unavailable. Action held for evaluation-integrity review.",
    agent_message: AGENT_DENY,
  };
}

function effective(report: ScoreReport): Verdict {
  return report.hookVerdict;
}

export function toClaudeOutput(rawEvent: string, report: ScoreReport): ClaudeHookOutput {
  const event = isPreExecuteEvent(rawEvent) ? "PreToolUse" : rawEvent;
  const verdict = effective(report);
  const context = report.steer.agentContext;
  if (event === "PreToolUse") {
    if (verdict === "block") {
      return {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: AGENT_DENY,
        },
      };
    }
    if (verdict === "steer" && context) {
      return {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          additionalContext: AGENT_STEER,
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
          "Please revise the request to preserve acceptance checks.",
      };
    }
    if (context) {
      return {
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext: AGENT_STEER,
        },
      };
    }
    return {};
  }
  if (event === "Stop" && verdict !== "ok") {
    return {
      hookSpecificOutput: {
        hookEventName: "Stop",
        additionalContext: AGENT_STOP,
      },
    };
  }
  return context
    ? {
        hookSpecificOutput: {
          hookEventName: event,
          additionalContext: AGENT_STEER,
        },
      }
    : {};
}

export function toCursorOutput(event: string, report: ScoreReport): CursorHookOutput {
  const verdict = effective(report);
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
    return verdict === "ok" ? {} : { additional_context: AGENT_STEER };
  }
  if (event === "preToolUse" || event === "beforeShellExecution") {
    if (verdict === "block") {
      return {
        permission: "deny",
        user_message: report.evidence[0]?.why,
        agent_message: AGENT_DENY,
      };
    }
    if (event === "preToolUse" && verdict === "steer") {
      return { agent_message: AGENT_STEER };
    }
    return {};
  }
  if (event === "stop" && verdict !== "ok") {
    return { followup_message: AGENT_STOP };
  }
  if (event === "sessionStart" && report.steer.agentContext) {
    return { additional_context: AGENT_STEER };
  }
  return {};
}

export function stageForEvent(event: string): ScoreInput["stage"] {
  if (isPreExecuteEvent(event)) return "tool";
  switch (event) {
    case "UserPromptSubmit":
    case "beforeSubmitPrompt":
    case "ui_prompt_end":
      return "prompt";
    case "afterAgentThought":
      return "thought";
    case "PreToolUse":
    case "preToolUse":
    case "pre_tool_use":
    case "beforeShellExecution":
    case "tool_call":
    case "tool.call":
      return "tool";
    case "afterFileEdit":
    case "PostToolUse":
    case "postToolUse":
    case "tool_result":
    case "tool.result":
      return "edit";
    case "Stop":
    case "stop":
    case "agent_end":
    case "agent.end":
      return "stop";
    default:
      return "trajectory";
  }
}
