import { pgEnum } from "drizzle-orm/pg-core";

export const skillLevelEnum = pgEnum("skill_level", [
  "novice",
  "advanced_beginner",
  "competent",
  "proficient",
  "expert",
]);

export type SkillLevel = (typeof skillLevelEnum.enumValues)[number];
