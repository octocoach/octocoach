"use client";

import {
  ContentLocale,
  ContentLocaleTypeOf,
  NewContentLocale,
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { useState, useTransition } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "..";
import Upload from "../Form/Upload";
import { getContent } from "../helpers";

const EditSectionLocale = ({
  locale,
  value,
  onSetValues,
}: {
  locale: Locales;
  value: SectionContentWithImage;
  onSetValues: (locale: Locales, values: SectionContentWithImage) => void;
}) => {
  const locales = {
    en: "English",
    de: "Deutsch",
  };

  const store = useFormStore<SectionContentWithImage>({
    defaultValues: {
      text: value.text,
      title: value.title,
      image: value.image,
    },
    setValues: (values) => onSetValues(locale, values),
  });

  const $ = store.names;

  return (
    <Box paddingX="none" grow>
      <Text size="l">{locales[locale]}</Text>

      <Form store={store}>
        <FormField name={$.image.alt} label="Alt Text">
          <FormInput name={$.image.alt} />
        </FormField>
        <FormField name={$.title} label="Title">
          <FormInput name={$.title} />
        </FormField>
        <FormField name={$.text} label="Text">
          <FormInput
            name={$.text}
            render={<textarea style={{ height: "10rem" }} />}
          />
        </FormField>
      </Form>
    </Box>
  );
};

export const EditSectionContentWithImage = ({
  id,
  name,
  content,
  saveContent,
}: {
  id: SectionId;
  name: string;
  content: ContentLocale[];
  saveContent: (data: NewContentLocale[]) => Promise<void>;
}) => {
  const contentEn = getContent<SectionContentWithImage>(content, id, "en");
  const contentDe = getContent<SectionContentWithImage>(content, id, "de");

  const [isPending, startTransition] = useTransition();

  const onSetValues = (locale: Locales, values: SectionContentWithImage) => {
    store.setValues((oldValues) => ({
      ...oldValues,
      [locale]: { id, locale, value: values },
    }));
  };

  const store = useFormStore<{
    [key in Locales]: ContentLocaleTypeOf<SectionContentWithImage>;
  }>({
    defaultValues: {
      en: {
        locale: "en",
        id,
        value: contentEn,
      },
      de: {
        locale: "de",
        id,
        value: contentDe,
      },
    },
  });

  const $ = store.names;

  const [image, setImage] = useState(contentEn.image);

  const onSubmit = () => {
    store.setValue($.en.value.image.src, image.src);
    store.setValue($.de.value.image.src, image.src);

    const toSave = Object.values(store.getState().values);
    startTransition(() => {
      saveContent(toSave);
    });
  };

  return (
    <Box paddingX="none" paddingY="none">
      <Text size="l">{name}</Text>
      <Stack spacing="tight">
        <Upload
          onUploaded={(src) => {
            setImage((image) => ({ ...image, src }));
          }}
        />
        <img
          src={image.src}
          alt={image.alt}
          width={400}
          style={{ imageRendering: "pixelated" }}
        />
      </Stack>
      <Stack direction="horizontal">
        <EditSectionLocale
          locale="en"
          value={contentEn}
          onSetValues={onSetValues}
        />
        <EditSectionLocale
          locale="de"
          value={contentDe}
          onSetValues={onSetValues}
        />
      </Stack>
      <Button type="submit" disabled={isPending} onPress={onSubmit}>
        Save Section
      </Button>
    </Box>
  );
};
