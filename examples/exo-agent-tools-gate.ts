/**
 * Optional Exo harness plugin: gate agent-created tools under
 * `.exo/agent-tools/` (DEFAULT_AGENT_TOOL_DIRECTORY in
 * exoharness/typescript/harness/tool-modules.ts).
 *
 * Honest limitation: Exo has no native hooks.json. Wrap register() /
 * registerTools so agent-source ToolInstance.handler.execute is scored
 * before it runs. Deny with opaque AGENT_DENY. Same sidecar as
 * examples/exo-tool-runtime.ts (`/api/hooks/generic` or `/api/hooks/exo`).
 */
import {
  AGENT_DENY,
  wrapToolHandlerExecute,
  type JsonObject,
  type JsonValue,
  type RhGuardExoOptions,
  type ToolHandler,
  type ToolResult,
} from "./exo-tool-runtime";

export { AGENT_DENY };

export const DEFAULT_AGENT_TOOL_DIRECTORY = ".exo/agent-tools";

export type HarnessToolSource = "built_in" | "library" | "agent";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: JsonValue;
}

export interface ToolInstance {
  definition: ToolDefinition;
  source: HarnessToolSource;
  handler: ToolHandler;
}

export function gateAgentToolInstance(
  tool: ToolInstance,
  options: RhGuardExoOptions = {}
): ToolInstance {
  if (tool.source !== "agent") {
    return tool;
  }
  return {
    ...tool,
    handler: wrapToolHandlerExecute(tool.definition.name, tool.handler, options),
  };
}

export function wrapHarnessToolRegistryRegister(
  register: (tool: ToolInstance) => unknown,
  options: RhGuardExoOptions = {}
): (tool: ToolInstance) => unknown {
  return (tool) => register(gateAgentToolInstance(tool, options));
}

export function rhGuardAgentToolsGate(options: RhGuardExoOptions = {}): {
  directory: string;
  gate: (tool: ToolInstance) => ToolInstance;
  wrapRegister: (
    register: (tool: ToolInstance) => unknown
  ) => (tool: ToolInstance) => unknown;
} {
  return {
    directory: DEFAULT_AGENT_TOOL_DIRECTORY,
    gate: (tool) => gateAgentToolInstance(tool, options),
    wrapRegister: (register) =>
      wrapHarnessToolRegistryRegister(register, options),
  };
}

export type { JsonObject, JsonValue, ToolHandler, ToolResult };
