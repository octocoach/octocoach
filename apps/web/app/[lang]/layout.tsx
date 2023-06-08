import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import { SSRProvider } from "@octocoach/ui";
import "@octocoach/ui/font.css";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import RootLayoutClient from "./layout-client";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const locale = params.lang as Locales;

  await loadLocaleAsync(locale);
  const dictionary = loadedLocales[locale];

  return (
    <html lang={locale} className={`${themeClass.mocha} ${bg}`}>
      <SSRProvider>
        <body>
          <RootLayoutClient dictionary={dictionary} locale={locale}>
            {children}
          </RootLayoutClient>
        </body>
      </SSRProvider>
    </html>
  );
}
