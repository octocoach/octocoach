"use client";

import { Task } from "@octocoach/db/schemas/common/task";
import { Box, Button, Card, Stack, Text } from "@octocoach/ui";
import { useState, useTransition } from "react";
import { AddUserTaskInterest, Answer } from "./actions";
import type { Skill } from "@octocoach/db/schemas/common/skill";

export const TaskCheck = ({
  skills,
  task,
  submitAnswer,
}: {
  skills: Pick<Skill, "id" | "name" | "description">[];
  task: Pick<Task, "id" | "question">;
  submitAnswer: (args: AddUserTaskInterest) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const [answer, setAnswer] = useState<Answer | undefined>();

  const onAnswer = (answer: Answer) => {
    startTransition(() => {
      submitAnswer({ answer, taskId: task.id, skillAssessments: [] });
    });
  };

  if (answer)
    return (
      <Stack>
        <Text>Answer: {answer}</Text>
        {skills.map((skill) => (
          <Box>{skill.name}</Box>
        ))}
      </Stack>
    );

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
          <Button onClick={() => setAnswer("no")} disabled={isPending}>
            No
          </Button>
          <Button onClick={() => setAnswer("yes")} disabled={isPending}>
            Yes
          </Button>
        </Stack>
        <Button
          color="secondary"
          onClick={() => setAnswer("dontknow")}
          disabled={isPending}
        >
          I do not know
        </Button>
      </Stack>
    </Stack>
  );
};
