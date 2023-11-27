import NextAuth from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { NextRequest } from "next/server";

const handler = async (
  req: NextRequest,
  context: { params: { nextauth: string[] } }
) => {
  const org = req.cookies.get("org");

  const isSignInPage =
    req.method === "GET" &&
    context.params.nextauth.length === 1 &&
    context.params.nextauth[0] === "signin";

  return NextAuth(req, context, await mkAuthOptions(org?.value, isSignInPage));
};

export { handler as GET, handler as POST };
