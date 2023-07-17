import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "de"];

// TODO: This is a workaround until this is solved:
// https://github.com/ivanhofer/typesafe-i18n/discussions/580#discussioncomment-6465405
function detectLocale(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language"),
  };
  const languages = new Negotiator({ headers }).languages();

  const defaultLocale = "en";

  const locale = match(languages, locales, defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = detectLocale(request);

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    `/((?!api|_next/static|_next/image|favicon.ico|en|de).*)`,
  ],
};
