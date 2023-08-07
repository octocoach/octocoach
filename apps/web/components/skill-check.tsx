import { Skill } from "@octocoach/db/src/schema/skills";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import { useEffect, useState, useTransition } from "react";
import { submitSkillAssessment } from "./actions";

interface Level {
  title: string;
  description: string;
}

const skillLevels: Level[] = [
  {
    title: "Novice",
    description: "I have no experience or knowledge about this topic.",
  },
  {
    title: "Beginner",
    description:
      "I have a basic understanding and can perform simple tasks with guidance.",
  },
  {
    title: "Competent",
    description:
      "I can perform tasks related to the topic independently. I can handle regular tasks confidently and I'm starting to deal with more complex issues.",
  },
  {
    title: "Advanced",
    description:
      "I can perform complex tasks and solve difficult problems. I have a deep understanding of the topic.",
  },
  {
    title: "Expert",
    description:
      "I have a deep and comprehensive understanding of the topic. I can teach others and handle all issues, including novel ones.",
  },
];

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
