import run from "@octocoach/db/helpers/run";
import { NextResponse } from "next/server";
const buildtime = require("./build-time.js");

export async function GET(request: Request): Promise<NextResponse> {
  const response = await run("ls -la");

  return NextResponse.json({ response, buildtime });
}
