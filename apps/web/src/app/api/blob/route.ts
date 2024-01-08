import { mkAuth } from "@octocoach/auth";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { auth } = await mkAuth();
  const session = await auth();

  console.log(session);

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
