import { Daily } from "@octocoach/daily";
import { Box, Markdown, Stack, Text } from "@octocoach/ui";
import { render } from "ai/rsc";
import OpenAI from "openai";

import { transcriptSystemMessage } from "./messages";
import { Summary } from "./summary";

export const Transcript = async ({ id }: { id: string }) => {
  const daily = new Daily();

  const transcript = await daily.getTranscriptContent(id);

  const openai = new OpenAI();

  const fixed = render({
    model: "gpt-4-turbo-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        content: transcriptSystemMessage,
      },
      { role: "user", content: transcript },
    ],
    text: ({ content, done }) => {
      return (
        <>
          <Markdown>{content}</Markdown>
          {done && <Summary transcript={content} />}
        </>
      );
    },
  });

  return (
    <Stack>
      <Stack direction="horizontal" fullWidth>
        <Box>
          <Text size="l" weight="bold">
            Original
          </Text>
          <Markdown>{transcript}</Markdown>
        </Box>
        <Box>
          <Text size="l" weight="bold">
            Fixed
          </Text>
          {fixed}
        </Box>
      </Stack>
    </Stack>
  );
};
