import { SSRProvider } from "@octocoach/ui";
import { latteThemeClass } from "@octocoach/ui/latteTheme.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={latteThemeClass}>
      <SSRProvider>
        <body>{children}</body>
      </SSRProvider>
    </html>
  );
}
