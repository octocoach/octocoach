import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { xHeaders } from "src/const";

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
  let basePath = headers().get(xHeaders.base);

  if (!basePath) {
    console.warn("No base path found.");
    basePath = "/";
  }

  return basePath;
}
