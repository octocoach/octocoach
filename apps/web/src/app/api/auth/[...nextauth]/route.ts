import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, account, profile }) {
      return { ...token, id: "user_2TTNLbfCmGjhhayy6RDBMBuuGY8" };
    },
    async session({ session, token }) {
      // ToDo: Remove this temporary hack
      return {
        ...session,
        user: { ...session.user, id: token.id },
      };
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
