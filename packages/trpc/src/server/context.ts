import { Session, isCoach, mkAuth } from "@octocoach/auth";
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
  const { auth } = await mkAuth(orgCookie?.value);
  const session = await auth();

  if (session?.user?.id && orgCookie?.value) {
    session.user.isCoach = await isCoach(session?.user.id, orgCookie?.value);
  }

  return await createContextInner({
    session,
  });
};

export type Context = Pick<AuthContext, "session">;
