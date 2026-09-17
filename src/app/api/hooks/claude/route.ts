import { NextResponse } from "next/server";
import { failClosedClaudeOutput, parseHookEvent, scoreEvent, toClaudeOutput } from "@/lib/risk";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(failClosedClaudeOutput("PreToolUse"));
  }
  try {
    const parsed = parseHookEvent(raw);
    const report = await scoreEvent(parsed.input);
    return NextResponse.json(toClaudeOutput(parsed.event, report));
  } catch {
    return NextResponse.json(failClosedClaudeOutput("PreToolUse"));
  }
}
