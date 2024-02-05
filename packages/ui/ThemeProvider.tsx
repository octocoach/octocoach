"use client";

import { ReactNode, useEffect } from "react";
import { getSystemTheme, prefersDarkQuery } from "./helpers";
import { flavors, themeClass } from "./theme.css";
import { Flavor } from "./theme/creator";

export const setFlavor = (flavor: Flavor) => {
  for (const f of flavors) {
    document.documentElement.classList.remove(themeClass[f]);
  }
  document.documentElement.classList.add(themeClass[flavor]);
};

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

    flavor = getSystemTheme();

    setFlavor(flavor);

    const callback = (ev: MediaQueryListEvent) => {
      setFlavor(ev.matches ? "mocha" : "latte");
    };

    window.matchMedia(prefersDarkQuery).addEventListener("change", callback);
  }, [flavor]);

  return <>{children}</>;
};
