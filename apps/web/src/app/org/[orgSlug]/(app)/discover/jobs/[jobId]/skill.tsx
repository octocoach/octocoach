import { Tag, Text } from "@octocoach/ui";

import { TaskSkill } from "./task";

export const Skill = ({ skill }: { skill: TaskSkill }) => {
  return (
    <Tag>
      <Text>{skill.name}</Text>
    </Tag>
  );
};
