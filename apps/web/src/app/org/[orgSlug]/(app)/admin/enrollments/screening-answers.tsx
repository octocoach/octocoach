import type { ScreeningAnswers } from "@octocoach/db/schemas/org/screening-questions";
import { Box, Card, Markdown, Stack, Tag, Text } from "@octocoach/ui";

export const ScreeningAnswersComponent = ({
  answers: { questions },
}: {
  answers: ScreeningAnswers;
}) => {
  return (
    <Card surface="mantle">
      <Stack>
        {questions.map(({ question, answer }, i) => (
          <Box key={i}>
            <Text weight="light">{question}</Text>
            {Array.isArray(answer) ? (
              answer.map((a, i) => <Tag key={i}>{a}</Tag>)
            ) : (
              <Markdown>{answer}</Markdown>
            )}
          </Box>
        ))}
      </Stack>
    </Card>
  );
};
