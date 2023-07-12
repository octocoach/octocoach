ALTER TABLE "jobs" RENAME COLUMN "company" TO "company_id";--> statement-breakpoint
ALTER TABLE "skill_subcategories" RENAME COLUMN "category" TO "category_id";--> statement-breakpoint
ALTER TABLE "skills" RENAME COLUMN "subcategory" TO "subcategory_id";--> statement-breakpoint
ALTER TABLE "skills" RENAME COLUMN "type" TO "type_id";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "job" TO "job_id";--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_company_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "skill_subcategories" DROP CONSTRAINT "skill_subcategories_category_skill_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "skills" DROP CONSTRAINT "skills_subcategory_skill_subcategories_id_fk";
--> statement-breakpoint
ALTER TABLE "skills" DROP CONSTRAINT "skills_type_skill_types_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_job_jobs_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill_subcategories" ADD CONSTRAINT "skill_subcategories_category_id_skill_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "skill_categories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_subcategory_id_skill_subcategories_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "skill_subcategories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_type_id_skill_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "skill_types"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
