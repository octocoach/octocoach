import TypesafeI18n from "@octocoach/i18n/src/i18n-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { loadAllLocalesAsync } from "@octocoach/i18n/src/i18n-util.async";
import { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
import { z } from "zod";

import { c } from "./helpers";

export const layoutPropsSchema = z.object<{
  children: React.ReactNode;
  locale: Locales;
}>({
  children: z.custom<React.ReactNode>(),
  locale: z.enum(["en", "de"]),
});

export const layoutSchema = z.object({
  shape: z.literal("single"),
  props: layoutPropsSchema,
});

export const Layout = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locales;
}) => {
  const [delayRenderId] = useState(() => delayRender());
  const [localesLoaded, setLocalesLoaded] = useState(false);

  useEffect(() => {
    if (delayRenderId) {
      void loadAllLocalesAsync().then(() => {
        setTimeout(() => {
          setLocalesLoaded(true);
          continueRender(delayRenderId);
        }, 1000);
      });
    }
  }, [delayRenderId]);

  if (!localesLoaded) return null;

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
