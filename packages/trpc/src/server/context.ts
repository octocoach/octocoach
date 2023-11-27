import { Session, getServerSession, isCoach } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
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
  const session = await getServerSession(await mkAuthOptions(orgCookie?.value));

  if (session?.user?.id && orgCookie?.value) {
    session.user.isCoach = await isCoach(session?.user.id, orgCookie?.value);
  }

  return await createContextInner({
    session,
  });
};

export type Context = Pick<AuthContext, "session">;
