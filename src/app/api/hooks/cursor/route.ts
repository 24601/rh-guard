import { NextResponse } from "next/server";
import { failClosedCursorOutput, parseHookEvent, scoreEvent, toCursorOutput } from "@/lib/risk";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(failClosedCursorOutput());
  }
  try {
    const parsed = parseHookEvent(raw);
    const report = await scoreEvent(parsed.input);
    return NextResponse.json(toCursorOutput(parsed.event, report));
  } catch {
    return NextResponse.json(failClosedCursorOutput());
  }
}
