"use client";

import { Skill } from "@octocoach/db/src/schema/skills";
import { Task } from "@octocoach/db/src/schema/tasks";
import { TasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import { UsersTasksInterest } from "@octocoach/db/src/schema/users-tasks-interest";
import { Button, Card, Container, Progress, Stack, Text } from "@octocoach/ui";
import { useEffect, useState, useTransition } from "react";
import { Answer, submitAnswer } from "./actions";
import { SkillCheck } from "./skill-check";
import { UsersSkillsLevels } from "@octocoach/db/src/schema/users-skills-levels";

type TaskWithUsersInterestAndSkill = Task & {
  usersTasksInterest: UsersTasksInterest[];
  tasksToSkills: (TasksToSkills & {
    skill: Skill & { usersSkillsLevels: UsersSkillsLevels[] };
  })[];
};

export default function TaskCheck({
  tasks,
}: {
  tasks: TaskWithUsersInterestAndSkill[];
}) {
  const [taskIndex, setTaskIndex] = useState(0);

  const newTasks = tasks.filter(
    ({ usersTasksInterest }) => !usersTasksInterest.length
  );

  const [checkedSkillIds, setCheckedSkillIds] = useState(
    tasks
      .flatMap((task) => task.tasksToSkills)
      .map(({ skill }) => skill)
      .flatMap((skill) => skill.usersSkillsLevels)
      .filter((level) => level)
      .map((level) => level.skillId)
  );

  const addCheckedSkillId = (id: Skill["id"]) => {
    setCheckedSkillIds((current) => [...current, id]);
  };

  const goToNext = () => {
    setTaskIndex((i) => (i >= newTasks.length - 1 ? i : i + 1));
    setShowSkillCheck(false);
  };

  useEffect(() => {
    const h = async ({ code }: KeyboardEvent) => {
      switch (code) {
        case "ArrowLeft":
          await onAnswer("no");
          break;
        case "ArrowRight":
          await onAnswer("yes");
          break;
        case "Space":
          await onAnswer("dontknow");
          break;
      }
    };

    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("keydown", h);
    };
  }, [goToNext]);

  const [isPending, startTransition] = useTransition();

  const [showSkillCheck, setShowSkillCheck] = useState(false);

  const onAnswer = (answer: Answer) =>
    startTransition(async () => {
      await submitAnswer({ answer, taskId: newTasks[taskIndex].id });
      if (answer === "no") {
        goToNext();
      } else {
        setShowSkillCheck(true);
      }
    });

  if (newTasks.length === 0)
    return (
      <Text size="xl" variation="casual">
        No more new tasks...
      </Text>
    );

  if (showSkillCheck) {
    return (
      <SkillCheck
        skills={newTasks[taskIndex].tasksToSkills
          .map(({ skill }) => skill)
          .filter((skill) => !checkedSkillIds.includes(skill.id))}
        onComplete={goToNext}
        addCheckedSkillId={addCheckedSkillId}
      />
    );
  }

  return (
    <Container element="section">
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
              {newTasks[taskIndex]?.question}
            </Text>
          </Card>
        </div>
        <Stack align="center">
          <Progress max={newTasks.length} value={taskIndex + 1} />
          <Stack direction="horizontal">
            <Button onPress={() => onAnswer("no")}>No</Button>
            <Button onPress={() => onAnswer("yes")}>Yes</Button>
          </Stack>
          <Button color="secondary" onPress={() => onAnswer("dontknow")}>
            I do not know
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}