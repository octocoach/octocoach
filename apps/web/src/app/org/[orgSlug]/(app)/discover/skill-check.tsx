"use client";

import { Skill } from "@octocoach/db/schemas/common/skill";
import { SkillLevel } from "@octocoach/db/schemas/common/skill-level";
import { skillLevelEnum } from "@octocoach/db/schemas/public/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Stack, Text, Button } from "@octocoach/ui";
import { SkillAssessment } from "./actions";
import { useTransition } from "react";

export const SkillCheck = ({
  skill,
  submitAnswer,
}: {
  skill: Pick<Skill, "id" | "name" | "description">;
  submitAnswer: (args: SkillAssessment) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const onAnswer = ({ skillLevel }: { skillLevel: SkillLevel }) => {
    startTransition(() => {
      submitAnswer({ id: skill.id, level: skillLevel });
    });
  };

  return (
    <Stack align="center" spacing="loose">
      <Text size="l" weight="light">
        What&apos;s Your Skill Level?
      </Text>
      <Text element="span" size="xl" variation="casual">
        {skill.name}
      </Text>
      <Text size="m">{skill.description}</Text>
      <Stack direction="horizontal" key={skill.id} align="center" wrap>
        {skillLevelEnum.enumValues.map((skillLevel, key) => (
          <Button
            onClick={() => onAnswer({ skillLevel })}
            key={key}
            disabled={isPending}
          >
            <Message id={`skillLevels.${skillLevel}.title`} />
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
