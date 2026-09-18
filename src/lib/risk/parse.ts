import type { ParsedHookEvent, ScoreInput } from "./domain";
import { stageForEvent } from "./hooks";

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function toolBlob(toolInput: unknown): string | undefined {
  if (typeof toolInput === "string") return toolInput;
  if (!toolInput || typeof toolInput !== "object") return undefined;
  try {
    return JSON.stringify(toolInput);
  } catch {
    return undefined;
  }
}

export function parseHookEvent(raw: unknown): ParsedHookEvent {
  const body = asRecord(raw);
  const nested = asRecord(body.input);
  const toolName =
    str(body.tool_name) ??
    str(body.toolName) ??
    str(body.tool) ??
    str(body.functionName) ??
    str(body.function_name);
  const toolInput =
    body.tool_input ??
    body.toolInput ??
    body.command ??
    body.arguments ??
    (Object.keys(nested).length > 0 ? body.input : undefined);
  const inferredToolEvent = toolName ? "tool_call" : undefined;
  const event =
    str(body.hook_event_name) ??
    str(body.hookEventName) ??
    str(body.event) ??
    inferredToolEvent ??
    "raw";
  const path =
    str(body.file_path) ??
    str(body.filePath) ??
    str(body.path) ??
    str(asRecord(toolInput).file_path) ??
    str(asRecord(toolInput).path) ??
    str(nested.path);
  const prompt = str(body.prompt) ?? str(body.text);
  const thought = event === "afterAgentThought" ? str(body.text) : undefined;
  const transcript = str(body.transcript) ?? str(body.conversation);
  const patch =
    str(body.patch) ??
    str(asRecord(toolInput).new_string) ??
    str(asRecord(toolInput).contents) ??
    str(asRecord(toolInput).command) ??
    str(nested.command);
  const source =
    str(body.hookEventName) && !str(body.hook_event_name)
      ? "grok"
      : event.startsWith("before") || event.startsWith("pre") || event === "stop"
        ? "cursor"
        : event === "raw"
          ? "raw"
          : event === "tool_call" || event === "tool.call"
            ? "generic"
            : "claude";
  const input: ScoreInput = {
    stage: stageForEvent(event),
    prompt,
    thought,
    toolName,
    toolInput: toolBlob(toolInput),
    path,
    patch,
    transcript,
  };
  return { source, event, input, raw };
}

export function parseScoreRequest(raw: unknown): ScoreInput {
  const body = asRecord(raw);
  if (body.stage || body.prompt || body.transcript) {
    const stage = str(body.stage);
    return {
      stage:
        stage === "prompt" ||
        stage === "thought" ||
        stage === "tool" ||
        stage === "edit" ||
        stage === "stop" ||
        stage === "trajectory"
          ? stage
          : "trajectory",
      prompt: str(body.prompt),
      thought: str(body.thought),
      toolName: str(body.toolName),
      toolInput: str(body.toolInput),
      path: str(body.path),
      patch: str(body.patch),
      transcript: str(body.transcript),
    };
  }
  return parseHookEvent(raw).input;
}
