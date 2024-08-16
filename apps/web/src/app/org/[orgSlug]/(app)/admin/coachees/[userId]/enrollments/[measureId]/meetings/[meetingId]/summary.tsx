import { Markdown } from "@octocoach/ui";

import { summarySystemMessage } from "./messages";

export function Summary({ transcript }: { transcript: string }) {
  console.log(transcript);
  console.log(summarySystemMessage);
  // TODO: Implement AI User Summary
  return <Markdown>Not Implemented;</Markdown>;
}
