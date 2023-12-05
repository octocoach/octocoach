"use client";

import { Task } from "@octocoach/db/schemas/common/task";
import { Button, Card, Stack, Text } from "@octocoach/ui";
import { useTransition } from "react";
import { AddUserTaskInterest, Answer } from "./actions";

export const TaskCheck = ({
  task,
  submitAnswer,
}: {
  task: Pick<Task, "id" | "question">;
  submitAnswer: (args: AddUserTaskInterest) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const onAnswer = (answer: Answer) => {
    startTransition(() => {
      submitAnswer({ answer, taskId: task.id });
    });
  };

  return (
    <Stack align="center" spacing="loose">
      <div
        style={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Card>
          <Text variation="casual" size="xl">
            {task.question}
          </Text>
        </Card>
      </div>
      <Stack align="center">
        <Stack direction="horizontal">
          <Button onClick={() => onAnswer("no")} disabled={isPending}>
            No
          </Button>
          <Button onClick={() => onAnswer("yes")} disabled={isPending}>
            Yes
          </Button>
        </Stack>
        <Button
          color="secondary"
          onClick={() => onAnswer("dontknow")}
          disabled={isPending}
        >
          I do not know
        </Button>
      </Stack>
    </Stack>
  );
};
