"use client";

import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  Box,
  Button,
  Form,
  FormField,
  FormInput,
  Stack,
  useFormStore,
} from "@octocoach/ui";
import Upload from "@octocoach/ui/Form/Upload";
import { NewMeasureWithInfo } from "./actions";
import { useState } from "react";

const EditMeasureLocale = ({
  locale,
  value,
  onSetValues,
}: {
  locale: Locales;
  value: NewMeasureWithInfo;
  onSetValues: (locale: Locales, values: NewMeasureWithInfo) => void;
}) => {
  const store = useFormStore<NewMeasureWithInfo>({
    defaultValues: value,
    setValues: (values) => onSetValues(locale, values),
  });

  const $ = store.names;

  return (
    <Box paddingX="none" grow>
      <Form store={store}>
        <Stack>
          <FormField name={$.image.alt} label="Alt Text">
            <FormInput name={$.image.alt} />
          </FormField>
          <FormField name={$.title} label="Title">
            <FormInput name={$.title} />
          </FormField>
          <FormField name={$.description} label="Description">
            <FormInput
              name={$.description}
              render={<textarea style={{ height: "10rem" }} />}
            />
          </FormField>
          <FormField name={$.requirements} label="Requirements">
            <FormInput
              name={$.requirements}
              render={<textarea style={{ height: "10rem" }} />}
            />
          </FormField>
        </Stack>
      </Form>
    </Box>
  );
};

export function AddMeasure({
  saveMeasure,
  orgSlug,
}: {
  saveMeasure: (data: Record<Locales, NewMeasureWithInfo>) => void;
  orgSlug: string;
}) {
  const blank: NewMeasureWithInfo = {
    title: "",
    description: "",
    requirements: "",
    image: { src: "", alt: "" },
  };
  const store = useFormStore<{ [key in Locales]: NewMeasureWithInfo }>({
    defaultValues: {
      en: blank,
      de: blank,
    },
  });

  const onSetValues = (locale: Locales, values: NewMeasureWithInfo) => {
    store.setValues((oldValues) => ({ ...oldValues, [locale]: values }));
  };

  const onSubmit = () => {
    const toSave = store.getState().values;

    toSave.en.image.src = image;
    toSave.de.image.src = image;

    saveMeasure(toSave);
  };

  const [image, setImage] = useState("");

  return (
    <Stack>
      <Stack spacing="tight">
        <Upload onUploaded={setImage} orgSlug={orgSlug} />
        {image && (
          <img
            src={image}
            height={200}
            width={200}
            style={{ imageRendering: "pixelated" }}
          />
        )}
      </Stack>
      <Stack direction="horizontal">
        <EditMeasureLocale
          locale="en"
          value={blank}
          onSetValues={onSetValues}
        />
        <EditMeasureLocale
          locale="de"
          value={blank}
          onSetValues={onSetValues}
        />
      </Stack>
      <Button onClick={onSubmit}>Save</Button>
    </Stack>
  );
}
