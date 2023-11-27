import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Retrieves the server session and redirects to the signin page if the session is not found.
 * @param orgSlug - The organization slug.
 * @returns The session object.
 */
export async function getServerSessionOrRedirect(orgSlug?: string) {
  const callbackUrl = headers().get("x-path") || "/";
  const session = await getServerSession(await mkAuthOptions(orgSlug));
  const searchParams = new URLSearchParams({
    callbackUrl,
  });

  if (!session) redirect(`/api/auth/signin?${searchParams}`);

  return session;
}
