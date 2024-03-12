import { orgDb } from "@octocoach/db/connection";
import { mkUserProfileTable } from "@octocoach/db/schemas/org/user-profile";
import { Card, Container, Markdown, Stack, Text } from "@octocoach/ui";
import { render } from "ai/rsc";
import OpenAI from "openai";
import { ReactNode } from "react";
import { summarySystemPrompt, summaryUserPrompt } from "./messages";

async function getSummary({
  orgSlug,
  userId,
}: {
  orgSlug: string;
  userId: string;
}): Promise<JSX.Element> {
  const db = orgDb(orgSlug);

  const user = await db.query.userTable.findFirst({
    with: {
      userProfile: true,
      usersTaskInterest: {
        with: { task: true },
      },
    },
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user) return <Text>User not found</Text>;

  const data = new TextEncoder().encode(
    JSON.stringify(user?.usersTaskInterest ?? [])
  );
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  if (user?.userProfile?.summaryHash === hash && user.userProfile.summary) {
    console.log("Summary cache hit!");
    return <Markdown>{user.userProfile.summary}</Markdown>;
  }

  const getQuestions = (answer: "yes" | "no" | "maybe") => {
    const i = answer === "yes" ? 1 : answer === "no" ? -1 : 0;
    if (!user) throw Error("No User!");
    return user.usersTaskInterest.filter((d) => d.interest === i);
  };

  const openai = new OpenAI();

  const summary = render({
    model: "gpt-4-turbo-preview",
    provider: openai,
    messages: [
      { role: "system", content: summarySystemPrompt(user.name || "unknown") },
      {
        role: "user",
        content: summaryUserPrompt({
          yes: getQuestions("yes")
            .map((q) => `- ${q.task.question}`)
            .join("\n"),
          no: getQuestions("no")
            .map((q) => `- ${q.task.question}`)
            .join("\n"),
          maybe: getQuestions("maybe")
            .map((q) => `- ${q.task.question}`)
            .join("\n"),
        }),
      },
    ],
    text: async ({ content, done }) => {
      if (done) {
        const userProfileTable = mkUserProfileTable(orgSlug);

        await db
          .insert(userProfileTable)
          .values({
            userId,
            summary: content,
            summaryHash: hash,
          })
          .onConflictDoUpdate({
            target: userProfileTable.userId,
            set: { summary: content, summaryHash: hash },
          });
      }

      return <Markdown>{content}</Markdown>;
    },
  });

  return <>{summary}</>;
}

export default async function Layout({
  children,
  params: { orgSlug, userId },
}: {
  children: ReactNode;
  params: { orgSlug: string; userId: string };
}) {
  const summary = await getSummary({ orgSlug, userId });

  return (
    <Container element="section">
      <Stack>
        <Card>{summary}</Card>
        <div>{children}</div>
      </Stack>
    </Container>
  );
}
