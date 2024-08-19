"use client";

import { Cohort } from "@octocoach/db/schemas/org/cohort";
import {
  Measure,
  MeasureInfo,
  ScreeningQuestion,
} from "@octocoach/db/schemas/org/measure";
import { ScreeningAnswers } from "@octocoach/db/schemas/org/screening-questions";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
import { exhaustiveCheck } from "@octocoach/tshelpers";
import {
  Button,
  ButtonLink,
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
import Link from "next/link";
import { useTransition } from "react";

import { CreateEnrollmentActionParams } from "./actions";

export const EnrollmentApplication = ({
  measure,
  locale,
  createEnrollmentAction,
  measureUrl,
  cohortId,
}: {
  measure: Pick<Measure, "id" | "type"> &
    Pick<MeasureInfo, "screeningQuestions">;
  locale: Locales;
  createEnrollmentAction: (
    params: CreateEnrollmentActionParams
  ) => Promise<void>;
  measureUrl: string;
  cohortId?: Cohort["id"];
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
      switch (measure.type) {
        case "individual":
          return void createEnrollmentAction({
            type: measure.type,
            enrollment: { measure: measure.id, screeningAnswers },
          });
        case "cohort":
          if (!cohortId) throw new Error("Missing Cohort ID");
          return void createEnrollmentAction({
            type: measure.type,
            enrollment: { cohort: cohortId, screeningAnswers },
          });
        default:
          return exhaustiveCheck(measure.type);
      }
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
          <FormSelect name={name} buttonStyle="border">
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
          <Message id="apply.screeningQuestions" />
        </Text>
        <Form store={store}>
          <Stack>
            <Stack spacing="tight">
              {measure.screeningQuestions?.map((q, idx) => getQuestion(idx, q))}
            </Stack>
            <Stack direction="horizontal" justify="right">
              <ButtonLink Element={Link} href={measureUrl}>
                <Message id="cancel" />
              </ButtonLink>

              <Button onClick={onSubmit} disabled={isPending}>
                <Message id="submit" />
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </Card>
  );
};
