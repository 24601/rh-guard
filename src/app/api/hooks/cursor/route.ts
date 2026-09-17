import { NextResponse } from "next/server";
import { parseHookEvent, score, toCursorOutput } from "@/lib/risk";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ continue: true });
  }
  const parsed = parseHookEvent(raw);
  const report = score(parsed.input);
  return NextResponse.json(toCursorOutput(parsed.event, report));
}
