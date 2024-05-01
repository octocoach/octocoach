import { Daily } from "@octocoach/daily";
import { Markdown } from "@octocoach/ui";

export const Transcript = async ({ id }: { id: string }) => {
  const daily = new Daily();

  const transcript = await daily.getTranscriptContent(id);

  return <Markdown>{transcript}</Markdown>;
};
