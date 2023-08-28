"use client";

import { trpc } from "@octocoach/trpc/src/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const UserSummary = ({ userId }: { userId: string }) => {
  const summary = trpc.user.summary.useQuery(userId);

  return <ReactMarkdown>{summary.data}</ReactMarkdown>;
};
