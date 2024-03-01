"use client";

import { ScreeningAnswers } from "@octocoach/db/schemas/org/enrollment";
import {
  Measure,
  MeasureInfo,
  ScreeningQuestion,
} from "@octocoach/db/schemas/org/measure";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  Button,
  Card,
  Checkbox,
  Form,
  FormCheckboxGroup,
  FormField,
  FormInput,
  FormSelect,
  SelectItem,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { CreateEnrollmentParams } from "./actions";
import { useTransition } from "react";

export const EnrollmentApplication = ({
  measure,
  locale,
  createEnrollment,
}: {
  measure: Pick<Measure, "id"> & Pick<MeasureInfo, "screeningQuestions">;
  locale: Locales;
  createEnrollment: (enrollment: CreateEnrollmentParams) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues: ScreeningAnswers = {
    locale,
    questions:
      measure.screeningQuestions?.map(({ question }) => ({
        question,
        answer: "",
      })) || [],
  };

  const store = useFormStore({
    defaultValues,
  });

  const onSubmit = () => {
    startTransition(() => {
      const screeningAnswers = store.getState().values;
      createEnrollment({ measure: measure.id, screeningAnswers });
    });
  };

  const getQuestion = (
    idx: number,
    { question, type, options }: ScreeningQuestion
  ) => {
    const name = `questions.${idx}.answer`;

    if (type === "short")
      return (
        <FormField name={name} label={question} key={idx}>
          <FormInput name={name} />
        </FormField>
      );

    if (type === "long")
      return (
        <FormField name={name} label={question} key={idx}>
          <FormInput
            name={name}
            render={<textarea style={{ height: "10rem" }} />}
          />
        </FormField>
      );

    if (type === "select")
      return (
        <FormField name={name} label={question} key={idx}>
          <FormSelect name={name}>
            {options?.map((option, i) => (
              <SelectItem value={option} key={i} />
            ))}
          </FormSelect>
        </FormField>
      );

    if (type === "multi-select")
      return (
        <FormCheckboxGroup name={name} label={question} key={idx}>
          {options?.map((option, i) => (
            <Checkbox label={option} value={option} key={i} />
          ))}
        </FormCheckboxGroup>
      );
  };

  return (
    <Card>
      <Stack spacing="loose">
        <Text variation="casual" size="l">
          Almost done, please answer some questions to help us assess your
          suitability for this training measure
        </Text>
        <Form store={store}>
          <Stack>
            <Stack spacing="tight">
              {measure.screeningQuestions?.map((q, idx) => getQuestion(idx, q))}
            </Stack>
            <Stack direction="horizontal" justify="right">
              <Button color="contrast">Cancel</Button>
              <Button onClick={onSubmit} disabled={isPending}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </Card>
  );
};