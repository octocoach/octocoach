"use client";

import { Task } from "@octocoach/db/src/schema/tasks";
import { Button, Card, Container, Stack, Text } from "@octocoach/ui";
import { useEffect, useState } from "react";

export const TaskCheck = ({ tasks }: { tasks: Task[] }) => {
  const [taskIndex, setTaskIndex] = useState(0);

  const goToNext = () => {
    setTaskIndex((i) => (i >= tasks.length - 1 ? i : i + 1));
  };

  const h = ({ code }: KeyboardEvent) => {
    console.log(code);
    switch (code) {
      case "ArrowLeft":
      case "ArrowRight":
      case "Space":
        goToNext();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("keydown", h);
    };
  }, []);

  return (
    <Container element="section">
      <Stack align="center" spacing="loose">
        <Text>Does this task interest you?</Text>
        <progress value={taskIndex + 1} max={tasks.length} />
        <div
          style={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Card>
            <Text variation="casual" size="xl">
              {tasks[taskIndex].description}
            </Text>
          </Card>
        </div>
        <Stack align="center">
          <Stack direction="horizontal">
            <Button onPress={goToNext}>No</Button>
            <Button onPress={goToNext}>Yes</Button>
          </Stack>
          <Button onPress={goToNext} color="secondary">
            I don't know
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
