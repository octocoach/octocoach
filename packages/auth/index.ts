import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

export default NextAuth;
export { getServerSession } from "next-auth";
export type { DefaultSession, DefaultUser, Session } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User extends DefaultUser {
    id: string;
  }
}
