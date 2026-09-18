/**
 * Exo has no native hooks.json. This is support via ToolRuntime wrap, not
 * drop-in hooks. It does not ship Claude-style PreToolUse JSON hooks.
 *
 * Wrap `ToolRuntime::execute` (Rust) / `TurnContext.executeTool` (TypeScript
 * harness) before shell and other mutating tools. Deny by returning
 * `{ ok: false, error: AGENT_DENY }`. Generic stdin (`hooks/run.ts exo`) is
 * available later; HTTP flavor `exo` is skipped — score via `/api/hooks/generic`
 * or in-repo `scoreEvent`.
 */
import { parseHookEvent, scoreEvent } from "../src/lib/risk";
import { AGENT_DENY } from "../src/lib/risk/steer";

export { AGENT_DENY };

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

export type ToolRequest = {
  functionName: string;
  arguments: JsonObject;
};

export type ToolResult = { ok: false; error: string } | JsonObject;

export type TurnContext = {
  executeTool(request: ToolRequest): Promise<ToolResult>;
};

export type ToolHandler = {
  execute(
    args: JsonObject,
    execution: { context: TurnContext }
  ): Promise<ToolResult>;
};

export type RhGuardExoOptions = {
  score?: (input: {
    functionName: string;
    arguments: JsonObject;
  }) => Promise<{ block: boolean }>;
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

async function shouldDeny(
  request: ToolRequest,
  options: RhGuardExoOptions
): Promise<boolean> {
  if (!isGatedExoHostTool(request.functionName)) return false;
  const score = options.score ?? defaultScore;
  try {
    const result = await score({
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

export function wrapTurnContextExecuteTool(
  context: TurnContext,
  options: RhGuardExoOptions = {}
): TurnContext {
  const inner = context.executeTool.bind(context);
  return {
    executeTool: wrapToolRuntimeExecute(inner, options),
  };
}

export function wrapTurnExecute(
  context: TurnContext,
  options: RhGuardExoOptions = {}
): TurnContext {
  return wrapTurnContextExecuteTool(context, options);
}

export function wrapToolHandlerExecute(
  toolName: string,
  handler: ToolHandler,
  options: RhGuardExoOptions = {}
): ToolHandler {
  return {
    async execute(args, execution) {
      const score = options.score ?? defaultScore;
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
