ALTER TABLE "employers" RENAME TO "companies";--> statement-breakpoint
ALTER TABLE "jobs" RENAME COLUMN "employer" TO "company";--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_employer_employers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_companies_id_fk" FOREIGN KEY ("company") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
