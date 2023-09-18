import SessionProvider from "@components/session-provider";
import mkAuthOptions from "@config/next-auth";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import TrpcProvider from "@octocoach/trpc/src/next/provider";
import { SSRProvider } from "@octocoach/ui";
import "@octocoach/ui/font.css";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import React from "react";
import RootLayoutClient from "./layout-client";

export default async function RootLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const cookieStore = cookies();
  cookieStore
    .getAll()
    .forEach((cookie) => console.log(`🍪 ${cookie.name}: ${cookie.value}`));
  const locale = (cookieStore.get("locale")?.value || "en") as Locales;

  await loadLocaleAsync(locale);
  const dictionary = loadedLocales[locale];

  const org = cookieStore.get("org")?.value;

  console.log("session org provider", org || "none");
  const session = await getServerSession(mkAuthOptions(org));

  return (
    <html lang={locale} className={`${themeClass.mocha} ${bg}`}>
      <SSRProvider>
        <body>
          <SessionProvider session={session}>
            {header}
            <RootLayoutClient dictionary={dictionary} locale={locale}>
              <TrpcProvider>{children}</TrpcProvider>
            </RootLayoutClient>
          </SessionProvider>
        </body>
      </SSRProvider>
    </html>
  );
}
