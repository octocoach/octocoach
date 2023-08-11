import { Text } from "@octocoach/ui";

interface SkillCategoryLevels {
  category: string;
  levels: [number, number, number, number, number];
}

export const SkillByCategory = ({
  categoryLevels,
}: {
  categoryLevels: SkillCategoryLevels[];
}) => {
  return (
    <div>
      {categoryLevels.map(({ category, levels }) => (
        <div>
          <Text>{category}</Text>
          <div>
            {levels.map((k, i) => (
              <span>
                {k}: {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
