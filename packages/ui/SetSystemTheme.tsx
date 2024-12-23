"use client";

import { FlavorName } from "@catppuccin/palette";
import { useEffect } from "react";

import { getSystemTheme, prefersDarkQuery } from "./helpers";
import { flavors, themeClass } from "./theme.css";

export { getSystemTheme };

export const setFlavor = (flavor: FlavorName) => {
  for (const f of flavors) {
    document.documentElement.classList.remove(themeClass[f]);
  }
  document.documentElement.classList.add(themeClass[flavor]);
};

const SetSystemTheme = () => {
  useEffect(() => {
    if (!document || !window) {
      return;
    }

    const flavor = getSystemTheme();

    setFlavor(flavor);

    const callback = (ev: MediaQueryListEvent) => {
      setFlavor(ev.matches ? "mocha" : "latte");
    };

    window.matchMedia(prefersDarkQuery).addEventListener("change", callback);
  }, []);

  return null;
};

export default SetSystemTheme;
