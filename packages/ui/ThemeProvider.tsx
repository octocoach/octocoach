"use client";

import { ReactNode, useEffect } from "react";
import { flavors, themeClass } from "./theme.css";
import { Flavor } from "./theme/creator";

export const ThemeProvider = ({
  children,
  flavor,
}: {
  children: ReactNode;
  flavor?: Flavor;
}) => {
  useEffect(() => {
    if (!document || !window || flavor) {
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = mql.matches;
    flavor = isDark ? "mocha" : "latte";

    const setFlavor = (flavor: Flavor) => {
      for (const f of flavors) {
        document.documentElement.classList.remove(themeClass[f]);
      }
      document.documentElement.classList.add(themeClass[flavor]);
    };

    setFlavor(flavor);

    const callback = (ev: MediaQueryListEvent) => {
      setFlavor(ev.matches ? "mocha" : "latte");
    };

    mql.addEventListener("change", callback);
  }, [flavor]);

  return <>{children}</>;
};
