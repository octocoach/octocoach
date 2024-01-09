import { I18nProvider } from "@octocoach/i18n";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import TrpcProvider from "@octocoach/trpc/src/next/provider";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import clsx from "clsx";
import { Recursive } from "next/font/google";
import { cookies } from "next/headers";
import React from "react";

const recursive = Recursive({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-recursive",
  axes: ["CASL", "MONO"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const locale = (cookieStore.get("locale")?.value || "en") as Locales;

  await loadLocaleAsync(locale);
  const dictionary = loadedLocales[locale];

  return (
    <html
      lang={locale}
      className={clsx(
        recursive.variable,
        recursive.className,
        themeClass.mocha,
        bg
      )}
    >
      <body>
        <I18nProvider dictionary={dictionary} locale={locale}>
          <TrpcProvider>{children}</TrpcProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
