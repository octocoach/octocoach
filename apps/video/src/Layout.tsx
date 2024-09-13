import TypesafeI18n from "@octocoach/i18n/src/i18n-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { AbsoluteFill } from "remotion";

import { c } from "./helpers";

export const Layout = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locales;
}) => {
  return (
    <TypesafeI18n locale={locale}>
      <AbsoluteFill
        style={{
          fontFamily: `var(--font-recursive)`,
          backgroundColor: c("crust"),
          color: c("text"),
          placeContent: "center",
          placeItems: "center",
        }}
      >
        {children}
      </AbsoluteFill>
    </TypesafeI18n>
  );
};
