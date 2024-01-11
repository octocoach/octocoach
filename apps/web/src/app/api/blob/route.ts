import { mkAuth } from "@octocoach/auth";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  let filename = searchParams.get("filename");
  const orgSlug = searchParams.get("orgSlug");

  const { auth } = await mkAuth(orgSlug);
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (orgSlug) {
    filename = `${orgSlug}/${filename}`;
  }

  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
