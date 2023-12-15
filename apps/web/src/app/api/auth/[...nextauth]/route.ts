import { mkAuth } from "@octocoach/auth";
import { NextRequest } from "next/server";

const handlers = async (
  req: NextRequest,
  context: { params: { nextauth: string[] } }
) => {
  const org = req.cookies.get("org");
  const orgSlug = org?.value;

  const isSignInPage =
    req.method === "GET" &&
    context.params.nextauth.length === 1 &&
    context.params.nextauth[0] === "signin";

  return (await mkAuth(orgSlug, isSignInPage)).handlers;
};

export { handlers as GET, handlers as POST };
export const runtime = "edge";
