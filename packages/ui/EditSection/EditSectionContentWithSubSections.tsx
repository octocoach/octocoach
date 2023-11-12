import {
  ContentLocale,
  ContentLocaleTypeOf,
  NewContentLocale,
  SectionContentWithImage,
  SectionContentWithSubSections,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { locales } from "@octocoach/i18n/src/i18n-util";
import { Box, Form, FormField, FormInput, Stack, Text, useFormStore } from "..";

const mockData: ContentLocaleTypeOf<SectionContentWithSubSections>[] = [
  {
    id: "method",
    locale: "en",
    value: {
      title: "title_en",
      subSections: [
        {
          title: "sub_en_1_title",
          text: "sub_en_1_text",
          image: { src: "", alt: "" },
        },
        {
          title: "sub_en_2_title",
          text: "sub_en_2_text",
          image: { src: "", alt: "" },
        },
      ],
    },
  },
  {
    id: "method",
    locale: "de",
    value: {
      title: "title_de",
      subSections: [
        {
          title: "sub_de_1_title",
          text: "sub_de_1_text",
          image: { src: "", alt: "" },
        },
        {
          title: "sub_de_2_title",
          text: "sub_de_2_text",
          image: { src: "", alt: "" },
        },
      ],
    },
  },
];

const mapFunction = (
  id: SectionId,
  input: ContentLocaleTypeOf<SectionContentWithSubSections>[]
) => {
  const filtered = input.filter((i) => i.id === id);
  const en = filtered.find((i) => i.locale === "en");
  const de = filtered.find((i) => i.locale === "de");

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

type MappedDataType = ReturnType<typeof mapFunction>;

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
  return (
    <Form store={store}>
      <Stack direction="horizontal">
        {locales.map((locale) => {
          return (
            <FormField name={locale} label={locale} key={locale}>
              <FormInput name={locale} />
            </FormField>
          );
        })}
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

  return (
    <Form store={store}>
      <Stack direction="horizontal">
        {locales.map((locale) => {
          return (
            <Stack>
              <Text>SubSection {index}</Text>
              <FormField name={$[locale].image.alt} label="Alt Text">
                <FormInput name={$[locale].image.alt} />
              </FormField>
              <FormField name={$[locale].title} label="Title">
                <FormInput name={$[locale].title} />
              </FormField>
              <FormField name={$[locale].text} label="Text">
                <FormInput name={$[locale].text} />
              </FormField>
            </Stack>
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
  const defaultValues: MappedDataType = mapFunction("method", mockData);

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

  const { values } = store.useState();

  return (
    <>
      <Box paddingX="none" paddingY="none">
        <EditTitle value={values.title} onSetValues={onSetTitle} />
        <div>
          {values.subSections.map((subSection, index) => (
            <EditSubSection
              index={index}
              value={subSection}
              onSetValues={onSetSubSection}
            />
          ))}
        </div>
      </Box>
      <p>{JSON.stringify(values)}</p>
    </>
  );
};
