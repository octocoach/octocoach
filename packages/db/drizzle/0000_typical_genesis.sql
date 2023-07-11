DO $$ BEGIN
 CREATE TYPE "job_source" AS ENUM('indeed', 'stepstone', 'linkedin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"indeed" text,
	"stepstone" text,
	"linkedin" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" "job_source" NOT NULL,
	"source_id" text,
	"company" integer NOT NULL,
	"title" text NOT NULL,
	"title_embedding" vector(1536) NOT NULL,
	"description" text NOT NULL,
	"description_embedding" vector(1536) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_categories" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_subcategories" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_embedding" vector(1536) NOT NULL,
	"info_url" text,
	"is_software" boolean NOT NULL,
	"is_language" boolean NOT NULL,
	"description" text,
	"description_embedding" vector(1536),
	"subcategory" integer NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks_to_skills" (
	"task_id" integer NOT NULL,
	"skill_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"job" integer NOT NULL,
	"embedding" vector(1536)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_companies_id_fk" FOREIGN KEY ("company") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill_subcategories" ADD CONSTRAINT "skill_subcategories_category_skill_categories_id_fk" FOREIGN KEY ("category") REFERENCES "skill_categories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_subcategory_skill_subcategories_id_fk" FOREIGN KEY ("subcategory") REFERENCES "skill_subcategories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_type_skill_types_id_fk" FOREIGN KEY ("type") REFERENCES "skill_types"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_to_skills" ADD CONSTRAINT "tasks_to_skills_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_to_skills" ADD CONSTRAINT "tasks_to_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_job_jobs_id_fk" FOREIGN KEY ("job") REFERENCES "jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
