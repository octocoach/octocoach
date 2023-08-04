CREATE TABLE IF NOT EXISTS "users_skills_levels" (
	"user_id" text NOT NULL,
	"skill_id" text NOT NULL,
	"level" integer NOT NULL,
	"created" timestamp DEFAULT now(),
	CONSTRAINT users_skills_levels_skill_id_user_id PRIMARY KEY("skill_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_skills_levels" ADD CONSTRAINT "users_skills_levels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_skills_levels" ADD CONSTRAINT "users_skills_levels_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
