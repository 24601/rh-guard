import { NextResponse } from "next/server";
import { parseHookEvent, score, toClaudeOutput } from "@/lib/risk";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
  const parsed = parseHookEvent(raw);
  const report = score(parsed.input);
  return NextResponse.json(toClaudeOutput(parsed.event, report));
}
