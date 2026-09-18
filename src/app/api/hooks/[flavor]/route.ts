import { NextResponse } from "next/server";
import {
  failClosedHostOutput,
  parseHookEvent,
  parseHookFlavor,
  scoreEvent,
  toHostOutput,
} from "@/lib/risk";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ flavor: string }> }
) {
  const { flavor: rawFlavor } = await params;
  const flavor = parseHookFlavor(rawFlavor);
  if (!flavor) {
    return NextResponse.json({ error: "unknown hook flavor" }, { status: 404 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(failClosedHostOutput(flavor));
  }
  try {
    const parsed = parseHookEvent(raw);
    const report = await scoreEvent(parsed.input);
    return NextResponse.json(toHostOutput(flavor, parsed.event, report));
  } catch {
    return NextResponse.json(failClosedHostOutput(flavor));
  }
}
