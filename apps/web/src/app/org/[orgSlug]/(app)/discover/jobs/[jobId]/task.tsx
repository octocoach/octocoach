"use client";

import { Skill } from "@octocoach/db/schemas/common/skill";
import { SkillLevel } from "@octocoach/db/schemas/common/skill-level";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import { StarFilled } from "@octocoach/ui/icons";

import { TaskIcon } from "./task-icon";

export interface TaskSkill {
  id: Skill["id"];
  name: Skill["name"];
  level: SkillLevel;
}

type Task = {
  id: number;
  description: string;
  interest: number;
  skills: TaskSkill[];
};

const skillLevels: Record<SkillLevel, number> = {
  novice: 1,
  advanced_beginner: 2,
  competent: 3,
  proficient: 4,
  expert: 5,
};

const Stars = ({ skillLevel }: { skillLevel: SkillLevel }) => {
  return (
    <Stack direction="horizontal">
      {Array.from(Array(skillLevels[skillLevel]).keys()).map((key) => (
        <StarFilled key={key} />
      ))}
    </Stack>
  );
};

export const Task = ({ task }: { task: Task }) => {
  return (
    <Card key={task.id}>
      <Stack spacing="loose">
        <Stack direction="horizontal">
          <TaskIcon interest={task.interest} />
          <Text>{task.description}</Text>
        </Stack>
        <Stack direction="horizontal" wrap>
          {task.skills
            .sort((a, b) => skillLevels[b.level] - skillLevels[a.level])
            .map((skill) => (
              <Tag key={skill.id}>
                <Stack spacing="tight" align="center">
                  <Text size="s">{skill.name}</Text>
                  <Stars skillLevel={skill.level} />
                </Stack>
              </Tag>
            ))}
        </Stack>
      </Stack>
    </Card>
  );
};
