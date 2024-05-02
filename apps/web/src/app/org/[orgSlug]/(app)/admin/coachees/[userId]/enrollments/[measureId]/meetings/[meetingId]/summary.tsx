import { Markdown } from "@octocoach/ui";
import { render } from "ai/rsc";
import OpenAI from "openai";

import { summarySystemMessage } from "./messages";

export function Summary({ transcript }: { transcript: string }) {
  const openai = new OpenAI();

  const summary = render({
    model: "gpt-4-turbo-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        content: summarySystemMessage,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
    text: ({ content }) => <Markdown>{content}</Markdown>,
  });
  return <>{summary}</>;
}
