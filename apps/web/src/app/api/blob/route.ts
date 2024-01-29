import { mkAuth } from "@octocoach/auth";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  let filename = searchParams.get("filename");

  if (!filename) {
    throw new Error("filename is required");
  }

  if (!request.body) {
    throw new Error("body is required");
  }

  const orgSlug = searchParams.get("orgSlug");

  const { auth } = await mkAuth(orgSlug ?? undefined);
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
