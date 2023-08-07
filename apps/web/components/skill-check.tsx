import { Skill } from "@octocoach/db/src/schema/skills";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import { useEffect, useState, useTransition } from "react";
import { submitSkillAssessment } from "./actions";
import { skillLevels } from "@app/constants";

export const SkillCheck = ({
  skills,
  onComplete,
  addCheckedSkillId,
}: {
  skills: Skill[];
  onComplete: () => void;
  addCheckedSkillId: (skillId: Skill["id"]) => void;
}) => {
  console.log("skills", skills);
  const [isPending, startTransition] = useTransition();

  const [skill, setSkill] = useState(skills[0]);
  const [totalSkills, setTotalSkills] = useState(skills.length);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (skills.length === 0) onComplete();

    setIndex(0);
    setTotalSkills(skills.length);
  }, [skills]);

  useEffect(() => {
    if (index !== undefined) setSkill(skills[index]);
  }, [index]);

  const onAnswer = async ({ level }: { level: number }) => {
    startTransition(async () => {
      await submitSkillAssessment({ skillId: skill.id, level });
      addCheckedSkillId(skill.id);

      if (index + 1 === totalSkills) {
        console.log("done");
        onComplete();
      } else {
        setIndex((index) => index + 1);
      }
    });
  };

  if (!skill) return null;

  return (
    <Container element="section">
      <Stack align="center" spacing="loose">
        <Text size="l" weight="light">
          What's Your Skill Level?
        </Text>
        <Text element="span" size="xl" variation="casual">
          {skill.name}
        </Text>
        <Text size="s">{skill.description}</Text>
        <Stack direction="horizontal" key={skill.id} align="center" wrap>
          {skillLevels.map(({ title }, level) => (
            <Button onPress={() => onAnswer({ level })}>{title}</Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
