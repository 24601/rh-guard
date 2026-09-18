/**
 * Hack Radar for Amp. Copy to .amp/plugins/ or ~/.config/amp/plugins/.
 * Self-contained: POSTs tool.call events to the sidecar so copies work.
 * In-repo you may instead `import { parseHookEvent, scoreEvent, toAmpOutput } from "../src/lib/risk"`
 * at the top of the module (never inline). Do not add the Amp plugin SDK.
 *
 * Deny with reject-and-continue + AGENT_DENY. Do not use the error action
 * as a deny, and do not throw — Amp ignores thrown plugin errors (fail-open).
 * Docs: https://ampcode.com/docs/plugin-api
 */
const AGENT_DENY =
  "Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.";

const SIDECAR = process.env.HACK_RADAR_URL ?? "http://127.0.0.1:43147/api/hooks/amp";

type AmpToolCallEvent = {
  tool: string;
  toolUseID?: string;
  input: Record<string, unknown>;
};

type AmpToolCallResult =
  | { action: "allow" }
  | { action: "reject-and-continue"; message: string };

type AmpPluginAPI = {
  on: (
    event: "tool.call",
    handler: (event: AmpToolCallEvent) => Promise<AmpToolCallResult>
  ) => void;
};

function pathOf(input: Record<string, unknown>): string | undefined {
  const path = input.path;
  const filePath = input.file_path;
  if (typeof path === "string" && path.trim()) return path;
  if (typeof filePath === "string" && filePath.trim()) return filePath;
  return undefined;
}

async function scoreToolCall(event: AmpToolCallEvent): Promise<AmpToolCallResult> {
  try {
    const res = await fetch(SIDECAR, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "tool.call",
        tool: event.tool,
        tool_name: event.tool,
        input: event.input,
        path: pathOf(event.input),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { action: "reject-and-continue", message: AGENT_DENY };
    }
    const json = (await res.json()) as {
      action?: string;
      message?: string;
      block?: boolean;
      reason?: string;
    };
    if (json.action === "reject-and-continue" || json.block === true) {
      return {
        action: "reject-and-continue",
        message: json.message ?? json.reason ?? AGENT_DENY,
      };
    }
    if (json.action === "allow" || json.block === false) {
      return { action: "allow" };
    }
    return { action: "reject-and-continue", message: AGENT_DENY };
  } catch {
    return { action: "reject-and-continue", message: AGENT_DENY };
  }
}

export default function hackRadar(amp: AmpPluginAPI) {
  amp.on("tool.call", async (event) => scoreToolCall(event));
}
