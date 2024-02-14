"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Select, SelectItem } from "@octocoach/ui";
import { getSystemTheme, setFlavor } from "@octocoach/ui/SetSystemTheme";
import { BrightnessContrast } from "@octocoach/ui/icons";

import { flavors } from "@octocoach/ui/theme.css";
import { startTransition } from "react";
import { removeTheme, setTheme } from "src/actions/theme";

const ThemeSwitcher = () => {
  const { LL } = useI18nContext();
  return (
    <Select
      displayValue={<BrightnessContrast size="24" />}
      aria-description={LL.theme()}
    >
      <SelectItem
        key="system"
        value={LL.systemTheme()}
        setValueOnClick={() => {
          const f = getSystemTheme();
          setFlavor(f);
          startTransition(() => {
            removeTheme();
          });
          return true;
        }}
      />
      {flavors.map((f) => (
        <SelectItem
          key={f}
          value={f}
          setValueOnClick={() => {
            setFlavor(f);
            startTransition(() => {
              setTheme(f);
            });
            return true;
          }}
        />
      ))}
    </Select>
  );
};

export default ThemeSwitcher;
