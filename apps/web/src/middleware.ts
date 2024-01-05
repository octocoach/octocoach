import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { NextRequest, NextResponse } from "next/server";

// TODO: This is a workaround until this is solved:
// https://github.com/ivanhofer/typesafe-i18n/discussions/580#discussioncomment-6465405
/**
 * Detects the locale based on the request headers.
 * @param {NextRequest} request - The request object.
 * @returns {string} The detected locale.
 */
function detectLocale(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language"),
  };
  const languages = new Negotiator({ headers }).languages();
  const locales = ["en", "de"];
  const defaultLocale = "en";
  const locale = match(languages, locales, defaultLocale);

  return locale;
}

const orgs: Record<string, string> = {
  "q15.co": "q15",
};

export default async (request: NextRequest) => {
  const url = request.nextUrl;
  let hostname = request.headers
    .get("host")
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const org = Object.keys(orgs).includes(hostname) ? orgs[hostname] : null;

  const response =
    org && !url.pathname.startsWith("/api")
      ? NextResponse.rewrite(new URL(`/org/${org}${url.pathname}`, request.url))
      : NextResponse.next();

  if (org) {
    response.headers.set("x-org", org);
    response.cookies.set("org", org);
    response.headers.set("x-base", "/");
  }

  const localeCookie = request.cookies.get("locale");

  if (!localeCookie) {
    const locale = detectLocale(request);

    response.cookies.set("locale", locale);
    response.headers.set("x-locale", locale);
  }

  response.headers.set("x-path", request.nextUrl.pathname);

  console.log("pathname", request.nextUrl.pathname);

  if (
    !org &&
    request.nextUrl.pathname.startsWith("/org") &&
    !(request.nextUrl.pathname === "/org")
  ) {
    const org = request.nextUrl.pathname.replace("/org/", "").split("/")[0];
    response.cookies.set("org", org);
    response.headers.set("x-org", org);
    response.headers.set("x-base", `/org/${org}/`);
  } else if (!request.nextUrl.pathname.startsWith("/api") && !org) {
    response.cookies.delete("org");
  }

  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    `/((?!_next/static|_next/image|favicon.ico).*)`,
  ],
};
