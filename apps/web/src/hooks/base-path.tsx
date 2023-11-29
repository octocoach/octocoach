import { usePathname } from "next/navigation";

/**
 * Custom hook that returns the base path.
 * If the path is related to an organization, it returns the org specific base path.
 * Otherwise, it returns an empty string.
 * @returns {string} The base path of the current URL.
 */
export const useBasePath = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/org")) {
    const orgPathParts = pathname.split("/");

    if (orgPathParts.length > 2) {
      const orgSlug = orgPathParts[2];

      return `/org/${orgSlug}`;
    }
  }

  return "";
};
