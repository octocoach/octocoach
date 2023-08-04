import { Skill } from "@octocoach/db/src/schema/skills";
import { Container, Stack, Button, Text } from "@octocoach/ui";
import { useEffect, useState } from "react";

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
}: {
  skills: Skill[];
  onComplete: () => void;
}) => {
  const [skill, setSkill] = useState(skills[0]);
  const [totalSkills, setTotalSkills] = useState(skills.length);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    setTotalSkills(skills.length);
  }, [skills]);

  useEffect(() => {
    if (index !== undefined) setSkill(skills[index]);
  }, [index]);

  const onAnswer = () => {
    console.log(`index: ${index}`);
    console.log(`total: ${totalSkills}`);
    if (index + 1 === totalSkills) {
      console.log("done");
      onComplete();
    } else {
      setIndex((index) => index + 1);
    }
  };

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
          {skillLevels.map(({ title }) => (
            <Button onPress={onAnswer}>{title}</Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
