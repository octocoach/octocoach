import { I18nProvider } from "@octocoach/i18n";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import { FlavorName } from "@octocoach/ui/theme/creator";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { Recursive } from "next/font/google";
import { cookies } from "next/headers";
import React from "react";

const SetSystemTheme = dynamic(() => import("@octocoach/ui/SetSystemTheme"), {
  ssr: false,
});

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
  const flavor = cookieStore.get("theme")?.value as FlavorName | undefined;

  return (
    <html
      lang={locale}
      className={clsx(
        recursive.variable,
        recursive.className,
        bg,
        flavor ? themeClass[flavor] : themeClass.latte
      )}
    >
      <body>
        {!flavor && <SetSystemTheme />}
        <I18nProvider dictionary={dictionary} locale={locale}>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
