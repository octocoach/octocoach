import { Daily } from "@octocoach/daily";
import { Box, Markdown, Stack, Text } from "@octocoach/ui";
import { render } from "ai/rsc";
import OpenAI from "openai";

import { systemMessage } from "./messages";

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
        content: systemMessage,
      },
      { role: "user", content: transcript },
    ],
    text: ({ content }) => <Markdown>{content}</Markdown>,
  });

  return (
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
  );
};
