"use client";

import { safeParseInt } from "@helpers/index";
import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { ScreeningQuestion } from "@octocoach/db/schemas/org/measure";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { getEntries } from "@octocoach/tshelpers";
import {
  Box,
  Button,
  Card,
  Form,
  FormCheckbox,
  FormField,
  FormInput,
  FormSelect,
  SelectItem,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import Upload from "@octocoach/ui/Form/Upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { SaveMeasureData, SaveMeasureRetype } from "./actions";
import { mapMeasureInfo, unmapMeasureInfo } from "./helpers";
import { ScreeningQuestions } from "./screening-questions";

const LocaleField = ({
  fieldName,
  type = "input",
}: {
  fieldName: keyof SaveMeasureData["measureInfo"][Locales];
  type?: "input" | "textarea";
}) => {
  const { LL } = useI18nContext();
  return (
    <Card>
      <Stack>
        <Text>{fieldName}</Text>
        <Stack direction="horizontal">
          {dbLocales.map((locale) => {
            return (
              <Box grow key={locale}>
                <FormField
                  name={`mappedMeasureInfo.${fieldName}.${locale}`}
                  label={LL.languages[locale]()}
                >
                  <FormInput
                    name={`mappedMeasureInfo.${fieldName}.${locale}`}
                    render={
                      type === "textarea" ? (
                        <textarea style={{ height: "10rem" }} />
                      ) : undefined
                    }
                  />
                </FormField>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Card>
  );
};

export function EditMeasure({
  measure,
  measureInfo,
  saveMeasureAction,
  orgSlug,
  baseUrl,
}: {
  measure: SaveMeasureData["measure"];
  measureInfo: SaveMeasureData["measureInfo"];
  saveMeasureAction: (data: SaveMeasureData) => SaveMeasureRetype;
  orgSlug: string;
  baseUrl: string;
}) {
  const mappedMeasureInfo = mapMeasureInfo(measureInfo);

  const defaultValues = {
    measure,
    mappedMeasureInfo,
  };

  const store = useFormStore({
    defaultValues,
    setValues: (values) => {
      store.setValue(
        store.names.measure.id,
        values.measure.id
          .toLowerCase()
          .replace(/[^A-Za-z0-9-\s]+/g, "")
          .replace(/\s+|-+\s+/g, "-")
      );
    },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit = () => {
    console.log(store.getState().values);

    const measure = store.getState().values.measure;
    const measureInfo = unmapMeasureInfo(
      store.getState().values.mappedMeasureInfo
    );

    startTransition(() => {
      const duration = safeParseInt(measure.duration);
      const maxParticipants = safeParseInt(measure.maxParticipants);

      void saveMeasureAction({
        measure: { ...measure, duration, maxParticipants },
        measureInfo,
      }).then((result) => {
        if (result.success === true) {
          store.reset();
          router.push(`${baseUrl}admin/measures/${measure.id}`);
        } else if (result.errors) {
          if (result.errors.measure?.issues?.length) {
            for (const issue of result.errors.measure.issues) {
              const path = `measure.${issue.path.join(".")}`;
              store.setFieldTouched(path, true);
              store.setError(path, issue.message);
            }
          }
          if (result.errors.measureInfo) {
            for (const [locale, errors] of getEntries(
              result.errors.measureInfo
            )) {
              if (errors?.issues.length) {
                for (const issue of errors.issues) {
                  const path = `mappedMeasureInfo.${issue.path.join(
                    "."
                  )}.${locale}`;

                  store.setFieldTouched(path, true);
                  store.setError(path, issue.message);
                }
              }
            }
          }
        }
      });
    });
  };

  const $ = store.names;
  $.mappedMeasureInfo.title.en;
  const imageSrc = store.useValue<string>($.measure.imageSrc);

  const onCancel = () => {
    startTransition(() => {
      router.push(`${baseUrl}admin/measures/${measure.id}`);
    });
  };

  const addNewQuestion = () => {
    const blankQuestion: ScreeningQuestion = {
      type: "short",
      question: "",
    };
    store.pushValue($.mappedMeasureInfo.screeningQuestions, {
      en: blankQuestion,
      de: blankQuestion,
    });
  };

  const addQuestionOption = (idx: number) => {
    for (const locale of dbLocales) {
      const question =
        store.getState().values.mappedMeasureInfo.screeningQuestions[idx];
      if (!question) throw new Error("Can't find question");
      const questionLocale = question[locale];

      if (!questionLocale) throw new Error("Can't find question locale");
      const options = questionLocale.options || ([] as string[]);

      store.setValue(
        `mappedMeasureInfo.screeningQuestions.${idx}.${locale}.options`,
        [...options, ""]
      );
    }
  };

  return (
    <Form store={store}>
      <Stack>
        <FormField name={$.measure.id} label="Slug">
          <FormInput name={$.measure.id} />
        </FormField>
        <FormField name={$.measure.type} label="Type">
          <FormSelect name={$.measure.type}>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="cohort">Cohort</SelectItem>
          </FormSelect>
        </FormField>
        <FormField name={$.measure.duration} label="Duration (weeks)">
          <FormInput name={$.measure.duration} type="number" />
        </FormField>
        <FormField name={$.measure.maxParticipants} label="Max Participants">
          <FormInput name={$.measure.maxParticipants} type="number" />
        </FormField>
        <FormField name={$.measure.rate} label="Rate">
          <FormInput name={$.measure.rate} type="number" />
        </FormField>
        <Upload
          onUploaded={(src) => store.setValue($.measure.imageSrc, src)}
          orgSlug={orgSlug}
        />
        {imageSrc && (
          <Image
            src={imageSrc}
            height={200}
            width={200}
            style={{ imageRendering: "pixelated" }}
            alt="Uploaded Image"
          />
        )}
        <LocaleField fieldName="title" />
        <FormCheckbox name={$.measure.accredited} label="Accredited" />
        <LocaleField fieldName="description" type="textarea" />
        <LocaleField fieldName="requirements" type="textarea" />
        <LocaleField fieldName="imageAlt" />

        <ScreeningQuestions
          addNewQuestion={addNewQuestion}
          onAddOption={addQuestionOption}
          screeningQuestions={
            store.useState().values.mappedMeasureInfo.screeningQuestions
          }
          onSetQuestionType={(idx, type) => {
            dbLocales.forEach((locale) => {
              store.setValue(
                `mappedMeasureInfo.screeningQuestions.${idx}.${locale}.type`,
                type
              );
            });
          }}
        />
        <Stack direction="horizontal">
          <Button onClick={onCancel} color="contrast">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
