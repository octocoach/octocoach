import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { ScreeningQuestion } from "@octocoach/db/schemas/org/measure";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  Box,
  Button,
  Card,
  FormField,
  FormInput,
  Select,
  SelectItem,
  Stack,
  Text,
} from "@octocoach/ui";
import { MappedMeasureInfo } from "./helpers";

const QuestionLocale = ({
  questionLocale,
  index,
  locale,
}: {
  questionLocale: MappedMeasureInfo["screeningQuestions"][number][Locales];
  index: number;
  locale: Locales;
}) => {
  if (!questionLocale) throw new Error("Missing Question Locale");
  const { LL } = useI18nContext();
  const path = `mappedMeasureInfo.screeningQuestions.${index}.${locale}`;

  return (
    <Box grow key={locale}>
      <FormField name={`${path}.question`} label={LL.languages[locale]()}>
        <FormInput name={`${path}.question`} />
      </FormField>
      {(questionLocale.type === "select" ||
        questionLocale.type === "multi-select") &&
        questionLocale.options && (
          <Stack>
            <Text variation="casual" weight="light">
              Options
            </Text>
            <Stack spacing="tight">
              {questionLocale.options.map((_, idx) => (
                <FormInput name={`${path}.options.${idx}`} key={idx} />
              ))}
            </Stack>
          </Stack>
        )}
    </Box>
  );
};

const Question = ({
  question,
  index,
  onSetQuestionType,

  onAddOption,
}: {
  question: MappedMeasureInfo["screeningQuestions"][number];
  index: number;

  onSetQuestionType: (idx: number, type: ScreeningQuestion["type"]) => void;
  onAddOption: (idx: number) => void;
}) => {
  const questionType = question.en.type;

  return (
    <Card>
      <Stack>
        <Select
          value={questionType}
          setValue={(value) =>
            onSetQuestionType(index, value as ScreeningQuestion["type"])
          }
          displayValue="Question Type"
        >
          <SelectItem value="short" />
          <SelectItem value="long" />
          <SelectItem value="select" />
          <SelectItem value="multi-select" />
        </Select>

        <Stack direction="horizontal" key={index}>
          {dbLocales.map((locale, i) => (
            <QuestionLocale
              locale={locale}
              index={index}
              key={i}
              questionLocale={question[locale]}
            />
          ))}
        </Stack>
        {(questionType === "select" || questionType === "multi-select") && (
          <Button onClick={() => onAddOption(index)}>Add Option</Button>
        )}
      </Stack>
    </Card>
  );
};

export const ScreeningQuestions = ({
  screeningQuestions,
  addNewQuestion,
  onSetQuestionType,
  onAddOption,
}: {
  screeningQuestions: MappedMeasureInfo["screeningQuestions"];
  addNewQuestion: () => void;
  onSetQuestionType: (idx: number, type: ScreeningQuestion["type"]) => void;
  onAddOption: (idx: number) => void;
}) => {
  return (
    <Stack>
      <Text size="l">Screening Questions</Text>
      <Stack>
        {screeningQuestions.map((q, i) => (
          <Question
            question={q}
            index={i}
            onSetQuestionType={onSetQuestionType}
            key={i}
            onAddOption={onAddOption}
          />
        ))}
      </Stack>
      <Button onClick={addNewQuestion}>Add Question</Button>
    </Stack>
  );
};
