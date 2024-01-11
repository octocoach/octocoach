import { Locales } from "@octocoach/i18n/src/i18n-types";
import { headers, cookies } from "next/headers";

export const getLocale = (): Locales => {
  const localeHeader = headers().get("x-locale");

  if (localeHeader) {
    return localeHeader as Locales;
  }

  const localeCookie = cookies().get("locale");

  if (localeCookie?.value) {
    return localeCookie.value as Locales;
  }

  return "de";
};
