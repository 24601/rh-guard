/**
 * RH Guard for Pi. Copy to ~/.pi/agent/extensions/ or .pi/extensions/.
 * Self-contained: POSTs tool_call events to HTTP /api/hooks/pi. For stdin
 * testing: `npx tsx hooks/run.ts pi`. Do not add a Pi SDK dep.
 *
 * Optional Claude-compatible command hooks (type: command only, not HTTP):
 * install @hsingjui/pi-hooks and merge examples/pi-hooks-settings.json into
 * .pi/settings.json (or ~/.pi/agent/settings.json).
 */
const AGENT_DENY =
  "Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.";

const SIDECAR =
  process.env.RH_GUARD_URL ??
  process.env.HACK_RADAR_URL ??
  "http://127.0.0.1:43147/api/hooks/pi";

type PiToolCallEvent = {
  toolName: string;
  toolCallId?: string;
  input: Record<string, unknown>;
};

type PiToolCallResult =
  | { block: true; reason: string; terminate?: boolean }
  | void;

type PiExtensionAPI = {
  on: (
    event: "tool_call",
    handler: (event: PiToolCallEvent) => Promise<PiToolCallResult>
  ) => void;
};

function pathOf(input: Record<string, unknown>): string | undefined {
  const path = input.path;
  const filePath = input.file_path;
  if (typeof path === "string" && path.trim()) return path;
  if (typeof filePath === "string" && filePath.trim()) return filePath;
  return undefined;
}

async function scoreToolCall(event: PiToolCallEvent): Promise<PiToolCallResult> {
  try {
    const res = await fetch(SIDECAR, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "tool_call",
        tool: event.toolName,
        tool_name: event.toolName,
        input: event.input,
        path: pathOf(event.input),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { block: true, reason: AGENT_DENY, terminate: true };
    }
    const json = (await res.json()) as { block?: boolean; reason?: string };
    if (json.block) {
      return { block: true, reason: json.reason ?? AGENT_DENY, terminate: true };
    }
  } catch {
    return { block: true, reason: AGENT_DENY, terminate: true };
  }
}

export default function hackRadar(pi: PiExtensionAPI) {
  pi.on("tool_call", async (event) => scoreToolCall(event));
}
