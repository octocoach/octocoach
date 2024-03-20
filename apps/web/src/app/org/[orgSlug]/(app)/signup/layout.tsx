import { I18nNamespace } from "@octocoach/i18n";
import { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <I18nNamespace namespace="signup">{children}</I18nNamespace>;
}
