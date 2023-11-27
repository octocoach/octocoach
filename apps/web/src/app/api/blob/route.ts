import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(await mkAuthOptions());

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
