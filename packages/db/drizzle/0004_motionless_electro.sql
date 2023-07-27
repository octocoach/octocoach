CREATE TABLE IF NOT EXISTS "skills_missing" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks_to_skills_missing" (
	"task_id" integer NOT NULL,
	"skill_missing_id" integer NOT NULL,
	CONSTRAINT tasks_to_skills_missing_task_id_skill_missing_id PRIMARY KEY("task_id","skill_missing_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_to_skills_missing" ADD CONSTRAINT "tasks_to_skills_missing_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_to_skills_missing" ADD CONSTRAINT "tasks_to_skills_missing_skill_missing_id_skills_missing_id_fk" FOREIGN KEY ("skill_missing_id") REFERENCES "skills_missing"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
