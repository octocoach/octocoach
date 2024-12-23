import { mkAuth } from "@octocoach/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { xHeaders } from "src/const";

/**
 * Retrieves the server session and redirects to the signin page if the session is not found.
 * @param orgSlug - The organization slug.
 * @returns The session object.
 */
export async function authOrRedirect(orgSlug?: string) {
  const callbackUrl = headers().get(xHeaders.path) || "/";
  const { auth } = await mkAuth(orgSlug);
  const session = await auth();
  const searchParams = new URLSearchParams({
    callbackUrl,
  });

  if (!session) redirect(`/api/auth/signin?${searchParams.toString()}`);

  return session;
}
