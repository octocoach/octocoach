import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Redirects to the specified path within the organization.
 *
 * @param path - The path to redirect to.
 * @throws Error if no base path is found.
 * @example
 * orgRedirect("/start");
 * // or
 * orgRedirect("start");
 */
export function orgRedirect(path: string) {
  const basePath = getBaseUrl();

  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  redirect(`${basePath}${path}`);
}

export function getBaseUrl() {
  const basePath = headers().get("x-base");

  if (!basePath) {
    throw new Error("No base path found");
  }

  return basePath;
}
