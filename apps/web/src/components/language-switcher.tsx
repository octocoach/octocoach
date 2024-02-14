"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { locales } from "@octocoach/i18n/src/i18n-util";
import { Select, SelectItem } from "@octocoach/ui";
import { Language } from "@octocoach/ui/icons";
import { useTransition } from "react";
import { saveLocale } from "src/actions/language";

const LanguageSwitcher = ({
  locale,
  baseUrl,
}: {
  locale: Locales;
  baseUrl: string;
}) => {
  const { LL } = useI18nContext();

  const [isPending, startTransition] = useTransition();
  return (
    <Select
      defaultValue={locale}
      displayValue={<Language size="24" />}
      aria-description={LL.language()}
      disabled={isPending}
    >
      {locales.map((locale) => (
        <SelectItem
          key={locale}
          value={LL.languages[locale]()}
          setValueOnClick={() => {
            startTransition(() => {
              saveLocale(locale).then(() => window.location.assign(baseUrl));
            });

            return true;
          }}
        />
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
