import { match } from "@formatjs/intl-localematcher";
import { db } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { cookieNames, xHeaders } from "./const";

// TODO: This is a workaround until this is solved:
// https://github.com/ivanhofer/typesafe-i18n/discussions/580#discussioncomment-6465405
/**
 * Detects the locale based on the request headers.
 * @param {NextRequest} request - The request object.
 * @returns {string} The detected locale.
 */
function detectLocale(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "en",
  };
  const languages = new Negotiator({ headers }).languages();
  const locales = ["en", "de"];
  const defaultLocale = "en";
  const locale = match(languages, locales, defaultLocale);

  return locale;
}

export default async function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (!host) {
    return NextResponse.error();
  }
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  let orgSlug: string | undefined;
  let isVanityUrl = false;

  if (
    host === "192.168.178.22:3000" ||
    host === "localhost:3000" ||
    host === process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
    host?.endsWith("vercel.app")
  ) {
    if (pathname.startsWith("/org") && !(pathname === "/org")) {
      orgSlug = pathname.replace("/org/", "").split("/")[0];
      requestHeaders.set(xHeaders.base, `/org/${orgSlug}/`);
    }
  } else {
    orgSlug = await db
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.domain, host))
      .then((res) => res[0]?.slug);

    if (!orgSlug) {
      console.log("Invalid domain, redirecting to root domain.");
      return NextResponse.redirect(
        `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
      );
    } else {
      isVanityUrl = true;
      requestHeaders.set(xHeaders.base, "/");
    }
  }

  if (orgSlug) {
    requestHeaders.set(xHeaders.org, orgSlug);
  }

  const locale = request.cookies.get("locale")?.value || detectLocale(request);
  requestHeaders.set(xHeaders.locale, locale);
  requestHeaders.set(xHeaders.path, pathname);

  const responseInit = {
    request: {
      headers: requestHeaders,
    },
  };

  const response =
    isVanityUrl && !pathname.startsWith("/api")
      ? NextResponse.rewrite(
          new URL(`/org/${orgSlug}${pathname}`, request.url),
          responseInit
        )
      : NextResponse.next(responseInit);

  if (orgSlug) {
    response.cookies.set(cookieNames.org, orgSlug);
  } else if (!pathname.startsWith("/api")) {
    response.cookies.delete(cookieNames.org);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _vercel/insights (vercel analytics)
     * - favicon.ico (favicon file)
     */
    `/((?!_next/static|_next/image|_vercel/insights|favicon.ico).*)`,
  ],
};
