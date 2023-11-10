"use client";

import {
  ContentLocale,
  ContentLocaleTypeOf,
  NewContentLocale,
  SectionContentSimple,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  Box,
  Button,
  Form,
  FormField,
  FormInput,
  Text,
  useFormStore,
} from "../";

import { useTransition } from "react";
import { Stack } from "../Stack/Stack";
import { filterContentById, getContentByLocale } from "../helpers";

const EditSectionLocale = ({
  locale,
  value,
  onSetValues,
}: {
  locale: Locales;
  value: SectionContentSimple;
  onSetValues: (locale: Locales, values: SectionContentSimple) => void;
}) => {
  const locales = {
    en: "English",
    de: "Deutsch",
  };

  const store = useFormStore<SectionContentSimple>({
    defaultValues: {
      text: value.text,
      title: value.title,
    },
    setValues: (values) => onSetValues(locale, values),
  });

  const $ = store.names;

  return (
    <Box paddingX="none" grow>
      <Text size="l">{locales[locale]}</Text>

      <Form store={store}>
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

export const EditSectionContentSimple = ({
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
  const sections = filterContentById<SectionContentSimple>(content, id);
  const contentEn = getContentByLocale<SectionContentSimple>(sections, "en");
  const contentDe = getContentByLocale<SectionContentSimple>(sections, "de");

  const [isPending, startTransition] = useTransition();

  const onSetValues = (locale: Locales, values: SectionContentSimple) => {
    store.setValues((oldValues) => ({
      ...oldValues,
      [locale]: { id, locale, value: values },
    }));
  };

  const store = useFormStore<{
    [key in Locales]: ContentLocaleTypeOf<SectionContentSimple>;
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

  const onSubmit = () => {
    const toSave = Object.values(store.getState().values);
    startTransition(() => {
      saveContent(toSave);
    });
  };

  return (
    <Box paddingX="none" paddingY="none">
      <Text size="l">{name}</Text>

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
