import { relations } from "drizzle-orm";
import { skillTable } from "../common/skill";
import { skillSubcategoryTable } from "../common/skill-subcategory";
import { skillTypeTable } from "../common/skill-type";
import { skillsTasksTable } from "../common/skills-tasks";
import { mkUsersSkillLevelsTable } from "./users-skill-levels";

export { skillTable };

export const mkSkillRelations = (slug: string) => {
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(slug);

  return relations(skillTable, ({ one, many }) => ({
    subcategory: one(skillSubcategoryTable, {
      fields: [skillTable.subcategoryId],
      references: [skillSubcategoryTable.id],
    }),
    type: one(skillTypeTable, {
      fields: [skillTable.typeId],
      references: [skillTypeTable.id],
    }),

    skillsTasks: many(skillsTasksTable),
    usersSkillLevels: many(usersSkillLevelsTable, {
      relationName: "skillUser",
    }),
  }));
};
