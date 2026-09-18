/**
 * Exo has no native hooks.json. This is support via ToolRuntime wrap, not
 * drop-in hooks. It does not ship Claude-style PreToolUse JSON hooks.
 *
 * Wrap `ToolRuntime::execute` (Rust trait in exoharness/exo
 * `crates/executor/src/executor_types.rs`) / `TurnContext.executeTool`
 * (TypeScript harness) before shell and other mutating tools. Score with
 * HTTP `POST /api/hooks/exo` (alias of generic `{ block, reason? }`),
 * `/api/hooks/generic`, in-repo `scoreEvent`, or stdin `hooks/run.ts exo`.
 * Deny by returning `{ ok: false, error: AGENT_DENY }`. Fail-closed is the
 * wrapper returning that tool error; the Exo host has no hook failClosed flag.
 * Keep generic stdin if Exo later adds hooks.
 */
import { parseHookEvent, scoreEvent } from "../src/lib/risk";
import { AGENT_DENY } from "../src/lib/risk/steer";

export { AGENT_DENY };

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

export type RhGuardExoOptions = {
  score?: (input: {
    functionName: string;
    arguments: JsonObject;
  }) => Promise<{ block: boolean }>;
  sidecarUrl?: string;
};

const GATED_HOST_TOOLS = new Set([
  "shell",
  "bash",
  "write",
  "edit",
  "install_agent_tool",
  "snapshot_sandbox",
  "create_adapter",
  "delete_adapter",
  "send_adapter_message",
]);

export function isGatedExoHostTool(functionName: string): boolean {
  const name = functionName.toLowerCase();
  if (GATED_HOST_TOOLS.has(name)) return true;
  return (
    name.includes("write") ||
    name.includes("edit") ||
    name.includes("shell") ||
    name.includes("snapshot")
  );
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

async function shouldDeny(
  request: ToolRequest,
  options: RhGuardExoOptions
): Promise<boolean> {
  if (!isGatedExoHostTool(request.functionName)) return false;
  try {
    const result = await resolveScore(options)({
      functionName: request.functionName,
      arguments: request.arguments,
    });
    return result.block;
  } catch {
    return true;
  }
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
  };
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
  const score = resolveScore(options);
  return {
    async execute(args, execution) {
      try {
        const result = await score({
          functionName: toolName,
          arguments: args,
        });
        if (result.block) {
          return deniedToolResult();
        }
      } catch {
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
