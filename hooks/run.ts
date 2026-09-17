#!/usr/bin/env node
import {
  failClosedClaudeOutput,
  failClosedCursorOutput,
  parseHookEvent,
  scoreEvent,
  toClaudeOutput,
  toCursorOutput,
} from "../src/lib/risk";

async function main() {
  const flavor = process.argv[2] === "cursor" ? "cursor" : "claude";
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
  const out =
    flavor === "cursor"
      ? toCursorOutput(parsed.event, report)
      : toClaudeOutput(parsed.event, report);
  process.stdout.write(`${JSON.stringify(out)}\n`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : "hook failed";
  process.stderr.write(`${message}\n`);
  const flavor = process.argv[2] === "cursor" ? "cursor" : "claude";
  if (flavor === "cursor") {
    process.stdout.write(`${JSON.stringify(failClosedCursorOutput())}\n`);
    process.exit(1);
  }
  process.stdout.write(`${JSON.stringify(failClosedClaudeOutput())}\n`);
  process.exit(2);
});
