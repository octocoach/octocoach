"use client";
import * as Ariakit from "@ariakit/react";
import debounce from "just-debounce-it";
import { useState } from "react";
import { formInput, formInputWrapper } from "../Form/formInput.css";
import { Text } from "../Text/Text";
import { comboboxItem, comboboxPopover } from "./city.css";
import { autocomplete } from "./helpers";

export const City = ({
  label,
  setValue,
  value,
}: {
  label: string;
  setValue: (value: string) => void;
  value: string;
}) => {
  const store = Ariakit.useComboboxStore({ defaultValue: value });
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
        <Text>{label}</Text>
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
