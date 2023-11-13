"use client";

import {
  ContentLocale,
  ContentLocaleTypeOf,
  NewContentLocale,
  SectionContentWithImage,
  SectionContentWithSubSections,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { startTransition, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Form,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "..";
import Upload from "../Form/Upload";

const locales: Locales[] = ["en", "de"];

const mapContent = (id: SectionId, input: ContentLocale[]) => {
  const filtered = input.filter((i) => i.id === id);
  const en = filtered.find(
    (i) => i.locale === "en"
  ) as ContentLocaleTypeOf<SectionContentWithSubSections>;
  const de = filtered.find(
    (i) => i.locale === "de"
  ) as ContentLocaleTypeOf<SectionContentWithSubSections>;

  const enValue: SectionContentWithSubSections = en
    ? en.value
    : {
        title: "",
        subSections: [],
      };

  const deValue: SectionContentWithSubSections = de
    ? de.value
    : {
        title: "",
        subSections: [],
      };

  const subSections: Record<Locales, SectionContentWithImage>[] = [];

  for (let i = 0; i < enValue.subSections.length; i++) {
    subSections[i] = {
      en: enValue.subSections[i],
      de: deValue.subSections[i],
    };
  }

  const title: Record<Locales, string> = {
    en: enValue.title,
    de: deValue.title,
  };

  return {
    title,
    subSections,
  };
};

type MappedDataType = ReturnType<typeof mapContent>;

const unmapData = (data: MappedDataType, id: SectionId): NewContentLocale[] => {
  const out: NewContentLocale[] = [];

  for (const locale of locales) {
    const newContent: NewContentLocale = {
      id,
      locale,
      value: {
        title: data.title[locale],
        subSections: data.subSections.map((subSection) => subSection[locale]),
      },
    };
    out.push(newContent);
  }
  return out;
};

const EditTitle = ({
  value,
  onSetValues,
}: {
  value: Record<Locales, string>;
  onSetValues: (title: Record<Locales, string>) => void;
}) => {
  const store = useFormStore({
    defaultValues: value,
    setValues: (values) => {
      onSetValues(values);
    },
  });

  const $ = store.names;

  return (
    <Form store={store}>
      <Stack>
        <Text size="m" variation="casual" weight="extraBold">
          Section Title
        </Text>
        <Stack direction="horizontal">
          <Box paddingX="none" paddingY="none" grow>
            <FormField name={$.en} label="English" key={$.en.toString()}>
              <FormInput name={$.en} />
            </FormField>
          </Box>
          <Box paddingX="none" paddingY="none" grow>
            <FormField name={$.de} label="Deutsch" key={$.de.toString()}>
              <FormInput name={$.de} />
            </FormField>
          </Box>
        </Stack>
      </Stack>
    </Form>
  );
};

const EditSubSection = ({
  index,
  value,
  onSetValues,
}: {
  value: Record<Locales, SectionContentWithImage>;
  index: number;
  onSetValues: (
    index: number,
    values: Record<Locales, SectionContentWithImage>
  ) => void;
}) => {
  const store = useFormStore({
    defaultValues: value,
    setValues: (values) => {
      console.log(values);
      onSetValues(index, values);
    },
  });

  const $ = store.names;

  const { src, alt } = store.useState().values.en.image;

  return (
    <Form store={store}>
      <Text>SubSection {index + 1}</Text>
      <Upload
        onUploaded={(src) => {
          const { values } = store.getState();
          locales.forEach((locale) => {
            values[locale].image.src = src;
          });
          onSetValues(index, { ...values });
        }}
      />
      {!!src && <img src={src} alt={alt} />}
      <Stack direction="horizontal">
        {locales.map((locale) => {
          const ref = useRef<HTMLTextAreaElement>(null);

          const [height, setHeight] = useState<number | "10rem">("10rem");

          const onInput = () => {
            setHeight("10rem");
            setHeight(ref.current ? ref.current.scrollHeight : "10rem");
          };

          return (
            <Box paddingX="none" paddingY="none" grow>
              <Stack key={locale}>
                <FormField name={$[locale].image.alt} label="Alt Text">
                  <FormInput name={$[locale].image.alt} />
                </FormField>
                <FormField name={$[locale].title} label="Title">
                  <FormInput name={$[locale].title} />
                </FormField>
                <FormField name={$[locale].text} label="Text">
                  <FormInput
                    name={$[locale].text}
                    render={
                      <textarea
                        ref={ref}
                        onInput={onInput}
                        style={{ height }}
                      />
                    }
                  />
                </FormField>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Form>
  );
};

export const EditSectionContentWithSubSections = ({
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
  const defaultValues: MappedDataType = mapContent("method", content);

  const onSetTitle = (title: Record<Locales, string>) => {
    store.setValues((oldValues) => ({ ...oldValues, title }));
  };

  const onSetSubSection = (
    index: number,
    values: Record<Locales, SectionContentWithImage>
  ) => {
    store.setValues((oldValues) => {
      oldValues.subSections[index] = values;
      return { ...oldValues };
    });
  };

  const store = useFormStore<MappedDataType>({
    defaultValues,
  });

  const $ = store.names;

  const { values } = store.useState();

  const onSubmit = () => {
    startTransition(() => {
      const toSave = unmapData(values, id);
      saveContent(toSave);
    });
  };

  const onAddSubSection = () => {
    const image = { src: "", alt: "" };
    const blank = {
      title: "",
      image,
    };
    store.pushValue($.subSections, {
      en: blank,
      de: blank,
    });
  };

  return (
    <Box paddingX="none" paddingY="none">
      <Text size="l">{name}</Text>

      <EditTitle value={values.title} onSetValues={onSetTitle} />
      <Box paddingX="none">
        <Stack spacing="loose">
          {values.subSections.map((subSection, index) => (
            <Card>
              <EditSubSection
                key={index}
                index={index}
                value={subSection}
                onSetValues={onSetSubSection}
              />
            </Card>
          ))}
        </Stack>
      </Box>
      <Stack direction="horizontal">
        <Button onPress={onAddSubSection}>Add Subsection</Button>
        <Button onPress={onSubmit}>Save Section</Button>
      </Stack>
    </Box>
  );
};
