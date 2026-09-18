/**
 * Hack Radar for Prime Agent. Copy to ~/.prime/agent/extensions/ or
 * .prime/agent/extensions/. Self-contained: POSTs tool_call events to the sidecar.
 *
 * Prime's tool_call result is { block, reason } only — no terminate in Prime docs.
 * Do not add a Prime/Pi SDK dep.
 */
const AGENT_DENY =
  "Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.";

const SIDECAR =
  process.env.HACK_RADAR_URL ?? "http://127.0.0.1:43147/api/hooks/prime";

type PrimeToolCallEvent = {
  toolName: string;
  toolCallId?: string;
  input: Record<string, unknown>;
};

type PrimeToolCallResult = { block: true; reason: string } | void;

type PrimeExtensionAPI = {
  on: (
    event: "tool_call",
    handler: (event: PrimeToolCallEvent) => Promise<PrimeToolCallResult>
  ) => void;
};

function pathOf(input: Record<string, unknown>): string | undefined {
  const path = input.path;
  const filePath = input.file_path;
  if (typeof path === "string" && path.trim()) return path;
  if (typeof filePath === "string" && filePath.trim()) return filePath;
  return undefined;
}

async function scoreToolCall(
  event: PrimeToolCallEvent
): Promise<PrimeToolCallResult> {
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
      return { block: true, reason: AGENT_DENY };
    }
    const json = (await res.json()) as { block?: boolean; reason?: string };
    if (json.block) {
      return { block: true, reason: json.reason ?? AGENT_DENY };
    }
  } catch {
    return { block: true, reason: AGENT_DENY };
  }
}

export default function hackRadar(prime: PrimeExtensionAPI) {
  prime.on("tool_call", async (event) => scoreToolCall(event));
}
