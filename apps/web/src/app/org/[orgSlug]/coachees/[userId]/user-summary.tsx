"use client";

import { trpc } from "@octocoach/trpc/src/client";
import { Card, Text } from "@octocoach/ui";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const UserSummary = ({
  userId,
  orgSlug,
}: {
  userId: string;
  orgSlug: string;
}) => {
  const summary = trpc.user.summary.useQuery({ userId, orgSlug });

  return (
    <Card>
      <Text>
        <ReactMarkdown>{summary.data}</ReactMarkdown>
      </Text>
    </Card>
  );
};
