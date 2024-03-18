"use client";
import * as Ariakit from "@ariakit/react";
import { Text } from "../Text/Text";
import { formInput, formInputWrapper } from "../Form/formInput.css";
import { useState } from "react";
import debounce from "just-debounce-it";
import { autocomplete } from "./helpers";
import { comboboxItem, comboboxPopover } from "./city.css";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";

export const City = ({ setValue }: { setValue: (value: string) => void }) => {
  const { LL } = useI18nContext();
  const store = Ariakit.useComboboxStore();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onSetValue = debounce(async (city: string) => {
    const s = store.getState();
    const hit = s.items.find((item) => item.value === city.trim());

    setValue(hit?.value || "");

    const cities = await autocomplete(city);
    setSuggestions(cities);
  }, 500);

  return (
    <Ariakit.ComboboxProvider store={store} setValue={onSetValue}>
      <label>
        <Text>{LL.address.city()}</Text>
        <div className={formInputWrapper}>
          <Ariakit.Combobox className={formInput} />
          <Ariakit.ComboboxPopover className={comboboxPopover}>
            {suggestions.length ? (
              suggestions.map((value, key) => (
                <Ariakit.ComboboxItem
                  key={key}
                  value={value}
                  className={comboboxItem}
                />
              ))
            ) : (
              <Text>Start typing...</Text>
            )}
          </Ariakit.ComboboxPopover>
        </div>
      </label>
    </Ariakit.ComboboxProvider>
  );
};
