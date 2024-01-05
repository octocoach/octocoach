import { mkAuth } from "@octocoach/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookieNames } from "src/const";

export const GET = async (
  req: NextRequest,
  context: { params: { nextauth: string[] } }
) => {
  const org = req.cookies.get(cookieNames.org);
  const orgSlug = org?.value;

  const isSignInPage =
    context.params.nextauth.length === 1 &&
    context.params.nextauth[0] === "signin";

  const { handlers } = await mkAuth(orgSlug, isSignInPage);

  if (handlers.GET) {
    return await handlers.GET(req);
  }

  return new NextResponse("GET method not allowed", { status: 405 });
};

export const POST = async (
  req: NextRequest,
  context: { params: { nextauth: string[] } }
) => {
  const org = req.cookies.get(cookieNames.org);
  const orgSlug = org?.value;

  const isSignInPage =
    context.params.nextauth.length === 1 &&
    context.params.nextauth[0] === "signin";

  const { handlers } = await mkAuth(orgSlug, isSignInPage);

  if (handlers.POST) {
    return await handlers.POST(req);
  }

  return new NextResponse("POST method not allowed", { status: 405 });
};
export const runtime = "edge";
export const preferredRegion = ["fra1"];
