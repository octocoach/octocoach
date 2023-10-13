"use client";
import * as Ariakit from "@ariakit/react";
import debounce from "just-debounce-it";
import { forwardRef, useState } from "react";
import { FormField } from "../Form/FormField";
import { FormInput } from "../Form/FormInput";
import { formInput, formInputWrapper } from "../Form/formInput.css";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { comboboxItem, comboboxPopover } from "./address.css";
import { Feature, autocomplete } from "./helpers";

const Combobox = ({
  label,
  store,
  setValue,
  suggestions = [],
}: {
  label: string;
  store: Ariakit.ComboboxStore;
  setValue: (text: string) => void;
  suggestions: Feature[];
}) => {
  return (
    <Ariakit.ComboboxProvider store={store} setValue={setValue}>
      <label>
        <Text>{label}</Text>
        <div className={formInputWrapper}>
          <Ariakit.Combobox className={formInput} />
          <Ariakit.ComboboxPopover className={comboboxPopover}>
            {suggestions.map(({ properties }, key) => (
              <Ariakit.ComboboxItem
                value={properties.formatted}
                key={key}
                className={comboboxItem}
                getItem={(item) => ({ ...item, ...properties })}
              />
            ))}
          </Ariakit.ComboboxPopover>
        </div>
      </label>
    </Ariakit.ComboboxProvider>
  );
};

export const Address = forwardRef<HTMLDivElement>(({ ...props }, ref) => {
  const form = Ariakit.useFormContext();
  if (!form) throw new Error("FormSelect must be used within a Form");

  const [streetSuggestions, setStreetSuggestions] = useState<Feature[]>([]);
  const streetComboboxStore = Ariakit.useComboboxStore({ defaultValue: "" });

  const onStreetChanged = debounce(async (street: string) => {
    const s = streetComboboxStore.getState();
    const hit = s.items.find(
      (item) => item.value === s.value
    ) as unknown as Feature["properties"];
    if (hit) {
      streetComboboxStore.setValue(hit.street);
      if (hit.housenumber) {
        form.setValue("housenumber", hit.housenumber);
      }
      postcodeComboboxStore.setValue(hit.postcode);
      cityComboboxStore.setValue(hit.city);
      stateComboboxStore.setValue(hit.state);
    } else {
      const features = await autocomplete(street);
      setStreetSuggestions(features);
    }
  }, 500);

  const [postcodeSuggestions, setPostcodeSuggestions] = useState<Feature[]>([]);
  const postcodeComboboxStore = Ariakit.useComboboxStore();

  const onPostcodeChanged = debounce(async (postcode: string) => {
    const s = postcodeComboboxStore.getState();
    const hit = s.items.find(
      (item) => item.value === s.value
    ) as unknown as Feature["properties"];

    if (hit) {
      cityComboboxStore.setValue(hit.city);
      postcodeComboboxStore.setValue(hit.postcode);
      stateComboboxStore.setValue(hit.state);
    } else {
      const features = await autocomplete(postcode, "postcode");
      setPostcodeSuggestions(features);
    }
  }, 500);

  const [citySuggestions, setCitySuggestions] = useState<Feature[]>([]);
  const cityComboboxStore = Ariakit.useComboboxStore();

  const onCityChanged = debounce(async (city: string) => {
    const s = cityComboboxStore.getState();
    const hit = s.items.find(
      (item) => item.value === s.value
    ) as unknown as Feature["properties"];

    if (hit) {
      cityComboboxStore.setValue(hit.city);
      stateComboboxStore.setValue(hit.state);
    } else {
      const features: Feature[] = await autocomplete(city, "city");
      setCitySuggestions(features);
    }
  }, 500);

  const [stateSuggestions, setStateSuggestions] = useState<Feature[]>([]);
  const stateComboboxStore = Ariakit.useComboboxStore();

  const onStateChanged = debounce(async (state: string) => {
    const s = stateComboboxStore.getState();
    const hit = s.items.find(
      (item) => item.value === s.value
    ) as unknown as Feature["properties"];

    console.log(hit);

    if (hit) {
      console.log(`Setting state to ${hit.state}`);
      stateComboboxStore.setValue(hit.state);
    } else {
      const features = await autocomplete(state, "state");
      setStateSuggestions(features);
    }
  }, 500);

  return (
    <Stack>
      <Combobox
        label="Street"
        store={streetComboboxStore}
        setValue={onStreetChanged}
        suggestions={streetSuggestions}
      />
      <FormField name={"housenumber"} label="House number">
        <FormInput name={"housenumber"} type="number" />
      </FormField>
      <Combobox
        label="Postcode"
        store={postcodeComboboxStore}
        setValue={onPostcodeChanged}
        suggestions={postcodeSuggestions}
      />
      <Combobox
        label="City"
        store={cityComboboxStore}
        setValue={onCityChanged}
        suggestions={citySuggestions}
      />
      <Combobox
        label="State"
        store={stateComboboxStore}
        setValue={onStateChanged}
        suggestions={stateSuggestions}
      />
    </Stack>
  );
});
