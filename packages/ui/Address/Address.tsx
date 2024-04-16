"use client";
import * as Ariakit from "@ariakit/react";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import debounce from "just-debounce-it";
import { useState } from "react";

import { FormField } from "../Form/FormField";
import { FormInput } from "../Form/FormInput";
import { formInput, formInputWrapper } from "../Form/formInput.css";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { comboboxItem, comboboxPopover } from "./address.css";
import { autocomplete, Feature } from "./helpers";

const Combobox = ({
  label,
  store,
  setValue,
  suggestions = [],
  flexGrow = 1,
}: {
  label: string;
  store: Ariakit.ComboboxStore;
  setValue: (text: string) => void;
  suggestions: Feature[];
  flexGrow?: number;
}) => {
  return (
    <Ariakit.ComboboxProvider store={store} setValue={setValue}>
      <label style={{ flexGrow, position: "relative" }}>
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

export const Address = ({ store }: { store: Ariakit.FormStore }) => {
  const { LL } = useI18nContext();
  const [addressLine1Suggestions, setAddressLine1Suggestions] = useState<
    Feature[]
  >([]);
  const addressLine1ComboboxStore = Ariakit.useComboboxStore({
    defaultValue: "",
  });

  const onAddressLine1Changed = debounce(async (addressLine1: string) => {
    store.setValue("addressLine1", addressLine1);
    const s = addressLine1ComboboxStore.getState();
    const hit = s.items.find(
      (item) => item.value === s.value
    ) as unknown as Feature["properties"];
    if (hit) {
      addressLine1ComboboxStore.setValue(
        `${hit.street} ${hit.housenumber || ""}`
      );
      postcodeComboboxStore.setValue(hit.postcode);
      cityComboboxStore.setValue(hit.city);
      stateComboboxStore.setValue(hit.state);
    } else {
      const features = await autocomplete(addressLine1);
      setAddressLine1Suggestions(features);
    }
  }, 500);

  const [postcodeSuggestions, setPostcodeSuggestions] = useState<Feature[]>([]);
  const postcodeComboboxStore = Ariakit.useComboboxStore();

  const onPostcodeChanged = debounce(async (postcode: string) => {
    store.setValue("postcode", postcode);
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
    store.setValue("city", city);
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
    store.setValue("state", state);
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
      <Text size="l">Address</Text>
      <Combobox
        label={LL.address.line1()}
        store={addressLine1ComboboxStore}
        setValue={onAddressLine1Changed}
        suggestions={addressLine1Suggestions}
      />
      <FormField name={"addressLine2"} label={LL.address.line2()}>
        <FormInput name={"addressLine2"} />
      </FormField>
      <Stack direction="horizontal">
        <Combobox
          label={LL.address.postcode()}
          store={postcodeComboboxStore}
          setValue={onPostcodeChanged}
          suggestions={postcodeSuggestions}
          flexGrow={0}
        />
        <Combobox
          label={LL.address.city()}
          store={cityComboboxStore}
          setValue={onCityChanged}
          suggestions={citySuggestions}
          flexGrow={1}
        />
      </Stack>
      <Combobox
        label={LL.address.state()}
        store={stateComboboxStore}
        setValue={onStateChanged}
        suggestions={stateSuggestions}
      />
    </Stack>
  );
};
