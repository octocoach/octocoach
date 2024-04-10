import {
  ContentLocale,
  ContentLocaleTypeOf,
  FAQQuestion,
  NewContentLocale,
  SectionContentFAQ,
  SectionId,
} from "@octocoach/db/schemas/org/content";
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
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { startTransition, useRef, useState } from "react";

const locales: Locales[] = ["en", "de"];

const blankQA: FAQQuestion = {
  question: "",
  answer: "",
};

const blankFAQSection: SectionContentFAQ = {
  title: "FAQ",
  questions: [],
};

const mapContent = (id: SectionId, input: ContentLocale[]) => {
  const filtered = input.filter((x) => x.id === id);
  const en = filtered.find(
    (i) => i.locale === "en"
  ) as ContentLocaleTypeOf<SectionContentFAQ>;

  const de = filtered.find(
    (i) => i.locale === "de"
  ) as ContentLocaleTypeOf<SectionContentFAQ>;

  const enValue: SectionContentFAQ = en ? en.value : blankFAQSection;
  const deValue: SectionContentFAQ = de ? de.value : blankFAQSection;

  const questions: Record<Locales, FAQQuestion>[] = [];

  for (let i = 0; i < enValue.questions.length; i++) {
    const en = enValue.questions[i];
    const de = deValue.questions[i];

    if (!en || !de) throw new Error("Missing Content Locale");

    questions[i] = {
      en,
      de,
    };
  }

  const title: Record<Locales, string> = {
    en: enValue.title,
    de: deValue.title,
  };

  return {
    title,
    questions,
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
        questions: data.questions.map((question) => question[locale]),
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

const EditQuestion = ({
  index,
  value,
  onSetValues,
}: {
  index: number;
  value: Record<Locales, FAQQuestion>;
  onSetValues: (index: number, values: Record<Locales, FAQQuestion>) => void;
}) => {
  const store = useFormStore({
    defaultValues: value,
    setValues: (values) => {
      onSetValues(index, values);
    },
  });

  const $ = store.names;

  return (
    <Form store={store}>
      <Stack direction="horizontal">
        {locales.map((locale) => {
          const ref = useRef<HTMLTextAreaElement>(null);

          const [height, setHeight] = useState<number | "10rem">("10rem");

          const onInput = () => {
            setHeight("10rem");
            setHeight(ref.current ? ref.current.scrollHeight : "10rem");
          };

          return (
            <Box paddingX="none" paddingY="none" grow key={locale}>
              <Stack>
                <FormField name={$[locale].question} label="Question">
                  <FormInput name={$[locale].question} />
                </FormField>
                <FormField name={$[locale].answer} label="Answer">
                  <FormInput
                    name={$[locale].answer}
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

export const EditFaqSection = ({
  id,
  name,
  content,
  saveContent,
}: {
  id: SectionId;
  name: string;
  content: ContentLocale[];
  saveContent: (data: NewContentLocale[]) => void;
}) => {
  const defaultValues: MappedDataType = mapContent("faq", content);

  const onSetTitle = (title: Record<Locales, string>) => {
    store.setValues((oldValues) => ({ ...oldValues, title }));
  };

  const onSetQuestion = (
    index: number,
    values: Record<Locales, FAQQuestion>
  ) => {
    store.setValues((oldValues) => {
      oldValues.questions[index] = values;
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

  const onAddQuestion = () => {
    store.pushValue($.questions, {
      en: blankQA,
      de: blankQA,
    });
  };

  return (
    <Box paddingX="none" paddingY="none">
      <Text size="l">{name}</Text>

      <EditTitle value={values.title} onSetValues={onSetTitle} />

      <Box paddingX="none">
        <Stack spacing="loose">
          {values.questions.map((question, index) => {
            return (
              <Card key={index}>
                <EditQuestion
                  index={index}
                  value={question}
                  onSetValues={onSetQuestion}
                />
              </Card>
            );
          })}
        </Stack>
      </Box>

      <Stack direction="horizontal">
        <Button onClick={onAddQuestion}>Add Question</Button>
        <Button onClick={onSubmit}>Save Section</Button>
      </Stack>
    </Box>
  );
};
