import { ClerkProvider } from "@clerk/nextjs";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import TrpcProvider from "@octocoach/trpc/src/next/provider";
import { SSRProvider } from "@octocoach/ui";
import "@octocoach/ui/font.css";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import RootLayoutClient from "./layout-client";

const Header = dynamic(() => import("../components/Header"), { ssr: false });

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
            <RootLayoutClient dictionary={dictionary} locale={locale}>
              <Header />
              <TrpcProvider>{children}</TrpcProvider>
            </RootLayoutClient>
          </body>
        </SSRProvider>
      </html>
    </ClerkProvider>
  );
}
