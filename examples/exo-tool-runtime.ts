/**
 * Exo has no native hooks.json. This is support via ToolRuntime wrap, not
 * drop-in hooks. It does not ship Claude-style PreToolUse JSON hooks.
 *
 * Wrap `ToolRuntime::execute` (Rust trait in exoharness/exo
 * `crates/executor/src/executor_types.rs`) / `TurnContext.executeTool`
 * (TypeScript harness). The gate is deny-by-default: every tool outside the
 * verified read-only surface is scored, including `shell`, `manage_tool`,
 * `install_agent_tool`, `uninstall_agent_tool`, `rebuild_and_restart_exo`,
 * `snapshot_sandbox`, `rewind_sandbox`, adapter enable/disable, and
 * agent-created tools from `.exo/agent-tools/`. Score with
 * HTTP `POST /api/hooks/exo` (alias of generic `{ block, reason? }`),
 * `/api/hooks/generic`, in-repo `scoreEvent`, or stdin `hooks/run.ts exo`.
 * Deny by returning `{ ok: false, error: AGENT_DENY }`. Fail-closed is the
 * wrapper returning that tool error; the Exo host has no hook failClosed flag.
 * Keep generic stdin if Exo later adds hooks.
 */
import { parseHookEvent, scoreEvent } from "../src/lib/risk";

export const AGENT_DENY =
  "Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

/** Matches exoharness/typescript/harness `ToolRequest`. */
export type ToolRequest = {
  functionName: string;
  arguments: JsonObject;
};

/** Exo `ToolResult` is JsonValue; deny uses the host's `{ ok: false, error }` shape. */
export type ToolResult = { ok: false; error: string } | JsonObject;

/** Structural subset of exo `TurnContext` — wrap `executeTool` only. */
export type TurnContext = {
  executeTool(request: ToolRequest): Promise<ToolResult>;
};

export type ToolHandler = {
  execute(
    args: JsonObject,
    execution: { context: TurnContext }
  ): Promise<ToolResult>;
};

export const DEFAULT_EXO_HOOK_URL = "http://127.0.0.1:43147/api/hooks/exo";

/** Same budget as the Pi, Amp, Prime, and Grok wrappers. A hang is a deny. */
export const SIDECAR_TIMEOUT_MS = 8000;

export type RhGuardExoOptions = {
  score?: (input: {
    functionName: string;
    arguments: JsonObject;
  }) => Promise<{ block: boolean }>;
  sidecarUrl?: string;
  timeoutMs?: number;
};

/**
 * Read-only tools on exoharness/exo main (`exoharness/typescript/harness`
 * built-in / adapter / skill tools, `exo/tools/*`, and the Rust dispatch in
 * `crates/executor/src/harness_tool.rs`). Everything else is gated, including
 * agent-created tools from `.exo/agent-tools/`, whose names are unknown ahead
 * of time. Exo ships no `bash`, `write`, or `edit` tool; do not invent
 * Claude-shaped names here.
 */
export const EXO_READ_ONLY_TOOLS = [
  "inspect_tools",
  "list_adapters",
  "list_adapter_events",
  "list_conversation_events",
  "list_scheduled_tasks",
  "list_sandbox_snapshots",
  "get_sandbox_status",
  "list_skills",
  "read_skill_file",
  "web_search",
  "web_fetch",
] as const;

/**
 * Mutating tools Exo actually ships. The gate does not depend on this list —
 * it is deny-by-default — but the names are asserted in tests so a rename
 * upstream shows up as a failure rather than a silent hole.
 */
export const EXO_MUTATING_TOOLS = [
  "shell",
  "manage_tool",
  "install_agent_tool",
  "uninstall_agent_tool",
  "rebuild_and_restart_exo",
  "snapshot_sandbox",
  "rewind_sandbox",
  "schedule_sandbox_task",
  "cancel_scheduled_task",
  "delete_scheduled_task",
  "create_adapter",
  "enable_adapter",
  "disable_adapter",
  "delete_adapter",
  "send_adapter_message",
  "install_skill",
  "uninstall_skill",
  "remember",
  "forget",
  "todowrite",
] as const;

const READ_ONLY = new Set<string>(EXO_READ_ONLY_TOOLS);

export function isGatedExoHostTool(functionName: string): boolean {
  return !READ_ONLY.has(functionName.toLowerCase());
}

export function deniedToolResult(): ToolResult {
  return { ok: false, error: AGENT_DENY };
}

export async function scoreViaHttp(
  input: {
    functionName: string;
    arguments: JsonObject;
  },
  url = DEFAULT_EXO_HOOK_URL
): Promise<{ block: boolean }> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event: "tool_call",
      functionName: input.functionName,
      arguments: input.arguments,
    }),
    signal: AbortSignal.timeout(SIDECAR_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`rh-guard ${url} HTTP ${response.status}`);
  }
  const json = (await response.json()) as { block?: boolean };
  return { block: json.block === true };
}

async function defaultScore(input: {
  functionName: string;
  arguments: JsonObject;
}): Promise<{ block: boolean }> {
  const parsed = parseHookEvent({
    event: "tool_call",
    functionName: input.functionName,
    arguments: input.arguments,
  });
  const report = await scoreEvent(parsed.input);
  return { block: report.hookVerdict === "block" };
}

function resolveScore(
  options: RhGuardExoOptions
): (input: {
  functionName: string;
  arguments: JsonObject;
}) => Promise<{ block: boolean }> {
  if (options.score) return options.score;
  if (options.sidecarUrl) {
    const url = options.sidecarUrl;
    return (input) => scoreViaHttp(input, url);
  }
  return defaultScore;
}

/**
 * A wrap that waits forever is an open gate. Bound every scoring path — HTTP,
 * in-process, or a caller-supplied `score` — and treat the timeout as a deny.
 */
async function withScoreTimeout<T>(pending: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      pending,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(
          () => reject(new Error(`rh-guard scoring timed out after ${ms}ms`)),
          ms
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function scoreOrDeny(
  input: { functionName: string; arguments: JsonObject },
  options: RhGuardExoOptions
): Promise<boolean> {
  try {
    const result = await withScoreTimeout(
      resolveScore(options)(input),
      options.timeoutMs ?? SIDECAR_TIMEOUT_MS
    );
    return result.block;
  } catch {
    return true;
  }
}

async function shouldDeny(
  request: ToolRequest,
  options: RhGuardExoOptions
): Promise<boolean> {
  if (!isGatedExoHostTool(request.functionName)) return false;
  return scoreOrDeny(
    { functionName: request.functionName, arguments: request.arguments },
    options
  );
}

export function wrapToolRuntimeExecute(
  inner: (request: ToolRequest) => Promise<ToolResult>,
  options: RhGuardExoOptions = {}
): (request: ToolRequest) => Promise<ToolResult> {
  return async (request) => {
    if (await shouldDeny(request, options)) {
      return deniedToolResult();
    }
    return inner(request);
  };
}

export function wrapTurnContextExecuteTool<T extends TurnContext>(
  context: T,
  options: RhGuardExoOptions = {}
): T {
  const inner = context.executeTool.bind(context);
  return {
    ...context,
    executeTool: wrapToolRuntimeExecute(inner, options),
  } as T;
}

export function wrapTurnExecute<T extends TurnContext>(
  context: T,
  options: RhGuardExoOptions = {}
): T {
  return wrapTurnContextExecuteTool(context, options);
}

export function wrapToolHandlerExecute(
  toolName: string,
  handler: ToolHandler,
  options: RhGuardExoOptions = {}
): ToolHandler {
  return {
    async execute(args, execution) {
      if (await scoreOrDeny({ functionName: toolName, arguments: args }, options)) {
        return deniedToolResult();
      }
      return handler.execute(args, execution);
    },
  };
}

export type RegisterableTool = {
  definition: { name: string };
  handler: ToolHandler;
};

/** Wrap exo `registerTools(registry, context, exported, source)` so each tool's execute is scored. */
export function wrapRegisterTools<
  TRegistry extends { register: (tool: TTool) => unknown },
  TTool extends RegisterableTool,
>(
  registerTools: (
    registry: TRegistry,
    context: unknown,
    exported?: unknown,
    source?: string
  ) => Promise<void> | void,
  options: RhGuardExoOptions = {}
): (
  registry: TRegistry,
  context: unknown,
  exported?: unknown,
  source?: string
) => Promise<void> | void {
  return (registry, context, exported, source) => {
    const wrapped = {
      ...registry,
      register(tool: TTool) {
        return registry.register({
          ...tool,
          handler: wrapToolHandlerExecute(tool.definition.name, tool.handler, options),
        });
      },
    } as TRegistry;
    return registerTools(wrapped, context, exported, source);
  };
}
