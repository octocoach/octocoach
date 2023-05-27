import { Header } from "ui";
import "ui/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Header text="octo.coach" />
        {children}
      </body>
    </html>
  );
}
