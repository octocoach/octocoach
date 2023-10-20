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

export default (request: NextRequest) => {
  const response = NextResponse.next();

  const locale = detectLocale(request);

  response.cookies.set("locale", locale);
  response.headers.set("x-url", request.nextUrl.pathname);

  if (
    request.nextUrl.pathname.startsWith("/org") &&
    !["/org", "/org/new"].includes(request.nextUrl.pathname)
  ) {
    const org = request.nextUrl.pathname.replace("/org/", "").split("/")[0];
    response.cookies.set("org", org);
    console.log("set org cookie", org);
  } else if (!request.nextUrl.pathname.startsWith("/api")) {
    console.log("delete org cookie");
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
