import { Skill } from "@octocoach/db/src/schema/skills";
import {
  SkillLevel,
  skillLevel,
} from "@octocoach/db/src/schema/users-skills-levels";
import Message from "@octocoach/i18n/src/react-message";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import { useEffect, useState, useTransition } from "react";
import { submitSkillAssessment } from "./actions";

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

  const onAnswer = async ({ skillLevel }: { skillLevel: SkillLevel }) => {
    startTransition(async () => {
      await submitSkillAssessment({ skillId: skill.id, skillLevel });
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
          What&apos;s Your Skill Level?
        </Text>
        <Text element="span" size="xl" variation="casual">
          {skill.name}
        </Text>
        <Text size="s">{skill.description}</Text>
        <Stack direction="horizontal" key={skill.id} align="center" wrap>
          {skillLevel.enumValues.map((skillLevel, key) => (
            <Button onPress={() => onAnswer({ skillLevel })} key={key}>
              <Message id={`skillLevels.${skillLevel}.title`} />
            </Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
