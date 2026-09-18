#!/usr/bin/env node
import {
  failClosedExitCode,
  failClosedHostOutput,
  parseHookEvent,
  parseHookFlavor,
  scoreEvent,
  successExitCode,
  toHostOutput,
  type HookFlavor,
} from "../src/lib/risk";
import { AGENT_DENY } from "../src/lib/risk/steer";

function resolveFlavor(raw: string | undefined): HookFlavor {
  if (!raw) return "claude";
  return parseHookFlavor(raw) ?? "generic";
}

async function main() {
  const flavor = resolveFlavor(process.argv[2]);
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }
  const text = Buffer.concat(chunks).toString("utf8").trim();
  if (!text) {
    process.exit(0);
  }
  const raw = JSON.parse(text) as unknown;
  const parsed = parseHookEvent(raw);
  const report = await scoreEvent(parsed.input);
  const out = toHostOutput(flavor, parsed.event, report);
  process.stdout.write(`${JSON.stringify(out)}\n`);
  const code = successExitCode(flavor, parsed.event, report);
  if (code !== 0) {
    process.stderr.write(`${AGENT_DENY}\n`);
  }
  process.exit(code);
}

main().catch((err: unknown) => {
  const flavor = resolveFlavor(process.argv[2]);
  const message = err instanceof Error ? err.message : "hook failed";
  process.stderr.write(`${message}\n`);
  process.stdout.write(`${JSON.stringify(failClosedHostOutput(flavor))}\n`);
  process.exit(failClosedExitCode(flavor));
});
