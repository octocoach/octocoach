import { Daily } from "@octocoach/daily";
import { Card } from "@octocoach/ui/Card/Card";
import { Markdown } from "@octocoach/ui/Markdown/Markdown";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";
import { render } from "ai/rsc";
import OpenAI from "openai";

import { transcriptSystemMessage } from "./messages";
import { Summary } from "./summary";

export const Transcript = async ({ id }: { id: string }) => {
  const daily = new Daily();

  const transcript = await daily.getTranscriptContent(id);

  const openai = new OpenAI();

  const fixed = render({
    model: "gpt-4-turbo",
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
        <Stack>
          <Card>
            <Text size="l" weight="bold">
              Conversation
            </Text>
            <Markdown>{content}</Markdown>
          </Card>
          {done && (
            <Card>
              <Text size="l" weight="bold">
                Summary
              </Text>
              <Summary transcript={content} />
            </Card>
          )}
        </Stack>
      );
    },
  });

  return <>{fixed}</>;
};
