"use client";

import { Select, SelectItem } from "@octocoach/ui";
import { setFlavor } from "@octocoach/ui/ThemeProvider";
import { getSystemTheme } from "@octocoach/ui/helpers";
import { flavors } from "@octocoach/ui/theme.css";
import { Flavor } from "@octocoach/ui/theme/creator";
import { startTransition, useState } from "react";
import { setTheme } from "src/actions/theme";

const ThemeSwitcher = ({ flavor }: { flavor?: Flavor }) => {
  if (!flavor) {
    flavor = getSystemTheme();
  }

  const [displayFlavor, setDisplayFlavor] = useState(flavor);

  return (
    <Select defaultValue={flavor} displayValue={displayFlavor}>
      {flavors.map((f) => (
        <SelectItem
          key={f}
          value={f}
          setValueOnClick={() => {
            setDisplayFlavor(f);
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
