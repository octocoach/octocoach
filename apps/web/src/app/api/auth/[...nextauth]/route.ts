import NextAuth from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { NextRequest } from "next/server";

const handler = (
  req: NextRequest,
  context: { params: { nextauth: string[] } }
) => {
  const org = req.cookies.get("org");

  return NextAuth(req, context, mkAuthOptions(org?.value));
};

export { handler as GET, handler as POST };
