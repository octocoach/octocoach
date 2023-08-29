DO $$ BEGIN
 CREATE TYPE "skill_level" AS ENUM('novice', 'advanced_beginner', 'competent', 'proficient', 'expert');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_skills_levels" ADD COLUMN "skill_level" "skill_level" NOT NULL;--> statement-breakpoint
ALTER TABLE "users_skills_levels" DROP COLUMN IF EXISTS "level";