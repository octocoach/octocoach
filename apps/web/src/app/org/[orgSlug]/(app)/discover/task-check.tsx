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
  submitAnswer: (args: AddUserTaskInterest) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();

  const onAnswer = (answer: Answer) => {
    startTransition(() => {
      void submitAnswer({ answer, taskId: task.id });
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
          <Button
            onClick={() => onAnswer("no")}
            disabled={isPending}
            glow
            color="error"
            size="large"
          >
            👎 No
          </Button>
          <Button
            onClick={() => onAnswer("yes")}
            disabled={isPending}
            glow
            color="success"
            size="large"
          >
            👍 Yes
          </Button>
        </Stack>
        <Button
          color="contrast"
          onClick={() => onAnswer("dontknow")}
          disabled={isPending}
        >
          🤷 Maybe
        </Button>
      </Stack>
    </Stack>
  );
};
