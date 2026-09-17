import { NextResponse } from "next/server";
import { parseScoreRequest, scoreEvent } from "@/lib/risk";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON body required." }, { status: 400 });
  }
  const report = await scoreEvent(parseScoreRequest(raw));
  return NextResponse.json(report);
}
