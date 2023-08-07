import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@components/Header";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import { SSRProvider } from "@octocoach/ui";
import "@octocoach/ui/font.css";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import { cookies } from "next/headers";
import RootLayoutClient from "./layout-client";

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
    <ClerkProvider>
      <html lang={locale} className={`${themeClass.mocha} ${bg}`}>
        <SSRProvider>
          <body>
            <Header />
            <RootLayoutClient dictionary={dictionary} locale={locale}>
              {children}
            </RootLayoutClient>
          </body>
        </SSRProvider>
      </html>
    </ClerkProvider>
  );
}
