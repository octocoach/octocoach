DO $$ BEGIN
 CREATE TYPE "job_source" AS ENUM('indeed', 'stepstone', 'linkedin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "skill_level" AS ENUM('novice', 'advanced_beginner', 'competent', 'proficient', 'expert');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_provider_account_id PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"indeed" text,
	"stepstone" text,
	"linkedin" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" "job_source" NOT NULL,
	"source_id" text,
	"employer_id" integer NOT NULL,
	"title" text NOT NULL,
	"title_embedding" vector(1536) NOT NULL,
	"description" text NOT NULL,
	"description_embedding" vector(1536) NOT NULL,
	"location" text,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_category" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_missing" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_subcategory" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_embedding" vector(1536) NOT NULL,
	"info_url" text,
	"is_software" boolean NOT NULL,
	"is_language" boolean NOT NULL,
	"description" text,
	"description_embedding" vector(1536),
	"subcategory_id" integer NOT NULL,
	"type_id" text NOT NULL,
	"aliases" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_type" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills_missing_tasks" (
	"skill_missing_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	CONSTRAINT skills_missing_tasks_skill_missing_id_task_id PRIMARY KEY("skill_missing_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills_tasks" (
	"skill_id" text NOT NULL,
	"task_id" integer NOT NULL,
	CONSTRAINT skills_tasks_skill_id_task_id PRIMARY KEY("skill_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"question" text NOT NULL,
	"job_id" integer NOT NULL,
	"embedding" vector(1536)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verification_token_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job" ADD CONSTRAINT "job_employer_id_employer_id_fk" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization" ADD CONSTRAINT "organization_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill_subcategory" ADD CONSTRAINT "skill_subcategory_category_id_skill_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "skill_category"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill" ADD CONSTRAINT "skill_subcategory_id_skill_subcategory_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "skill_subcategory"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill" ADD CONSTRAINT "skill_type_id_skill_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "skill_type"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills_missing_tasks" ADD CONSTRAINT "skills_missing_tasks_skill_missing_id_skill_missing_id_fk" FOREIGN KEY ("skill_missing_id") REFERENCES "skill_missing"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills_missing_tasks" ADD CONSTRAINT "skills_missing_tasks_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills_tasks" ADD CONSTRAINT "skills_tasks_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills_tasks" ADD CONSTRAINT "skills_tasks_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
