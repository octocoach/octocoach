import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { Session, getServerSession } from "next-auth";
import { cookies } from "next/headers";

interface AuthContext {
  session: Session | null;
}

export const createContextInner = async ({ session }: AuthContext) => {
  return {
    session,
  };
};

export const createContext = async () => {
  const orgCookie = cookies().get("org");
  const session = await getServerSession(mkAuthOptions(orgCookie?.value));

  return await createContextInner({
    session,
  });
};

export type Context = Pick<AuthContext, "session">;
