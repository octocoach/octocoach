"use client";

import { trpc } from "@octocoach/trpc/src/client";
import { Card, Text } from "@octocoach/ui";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const UserSummary = ({ userId }: { userId: string }) => {
  const summary = trpc.user.summary.useQuery(userId);

  return (
    <Card>
      <Text>
        <ReactMarkdown>{summary.data}</ReactMarkdown>
      </Text>
    </Card>
  );
};
