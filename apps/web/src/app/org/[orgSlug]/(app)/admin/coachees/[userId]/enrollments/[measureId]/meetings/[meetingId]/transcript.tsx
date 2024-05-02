import { Daily } from "@octocoach/daily";

import { Summary } from "./summary";

export const Transcript = async ({ id }: { id: string }) => {
  const daily = new Daily();

  const transcript = await daily.getTranscriptContent(id);

  return <Summary transcript={transcript} />;
};
