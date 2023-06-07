import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import TypesafeI18n from "@octocoach/i18n/src/react-provider";
import { SSRProvider } from "@octocoach/ui";
import "@octocoach/ui/font.css";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "en";
  await loadLocaleAsync(locale);

  return (
    <html lang={locale} className={`${themeClass.mocha} ${bg}`}>
      <SSRProvider>
        <TypesafeI18n locale={locale}>
          <body>{children}</body>
        </TypesafeI18n>
      </SSRProvider>
    </html>
  );
}
