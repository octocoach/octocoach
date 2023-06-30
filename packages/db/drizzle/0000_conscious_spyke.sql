DO $$ BEGIN
 CREATE TYPE "job_source" AS ENUM('indeed', 'stepstone');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"source" "job_source" NOT NULL,
	"id" varchar NOT NULL,
	"employer" varchar NOT NULL,
	"title" text,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_source_id" PRIMARY KEY("source","id");
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
	"id" varchar(3) PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_employers_id_fk" FOREIGN KEY ("employer") REFERENCES "employers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill_subcategories" ADD CONSTRAINT "skill_subcategories_category_skill_categories_id_fk" FOREIGN KEY ("category") REFERENCES "skill_categories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
