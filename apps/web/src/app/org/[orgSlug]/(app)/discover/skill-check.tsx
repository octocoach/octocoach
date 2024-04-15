"use client";

import { Skill } from "@octocoach/db/schemas/common/skill";
import { SkillLevel } from "@octocoach/db/schemas/common/skill-level";
import { skillLevelEnum } from "@octocoach/db/schemas/public/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Stack, Text, Button } from "@octocoach/ui";
import { SkillAssessment } from "./actions";
import { useState, useTransition } from "react";

const SkillDescription = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState(false);

  const sentences = description ? description.split(". ") : [];

  if (!sentences.length) return null;

  return (
    <Stack align="center">
      <Text size="m">
        {sentences
          .slice(0, showMore ? sentences.length : 1)
          .map((sentence) => `${sentence}. `)}
      </Text>
      <Button
        color="contrast"
        size="small"
        onClick={() => setShowMore((showMore) => !showMore)}
      >
        {showMore ? "Read Less" : "Read More"}
      </Button>
    </Stack>
  );
};

export const SkillCheck = ({
  skill,
  submitAnswer,
}: {
  skill: Pick<Skill, "id" | "name" | "description">;
  submitAnswer: (args: SkillAssessment) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();

  const onAnswer = ({ skillLevel }: { skillLevel: SkillLevel }) => {
    startTransition(() => {
      void submitAnswer({ id: skill.id, level: skillLevel });
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
      {skill.description && (
        <SkillDescription description={skill.description} />
      )}
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
