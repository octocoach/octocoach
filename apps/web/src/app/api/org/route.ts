import run from "@octocoach/db/helpers/run";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const response = await run("ls -la");

  return NextResponse.json({ response });
}
