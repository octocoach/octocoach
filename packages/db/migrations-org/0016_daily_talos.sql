DO $$ BEGIN
 CREATE TYPE "public"."measure_type" AS ENUM('cohort', 'individual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "enrollment_status" ADD VALUE 'rejected';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."cohort_enrollment" (
	"cohort" text NOT NULL,
	"user" text NOT NULL,
	"status" "enrollment_status" DEFAULT 'pending' NOT NULL,
	"comments" text,
	"screening_answers" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cohort_enrollment_cohort_user_pk" PRIMARY KEY("cohort","user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."cohort" (
	"id" text PRIMARY KEY NOT NULL,
	"measure" text NOT NULL,
	"start_date" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "org_{slug}"."enrollment" RENAME TO "individual_enrollment";--> statement-breakpoint
ALTER TABLE "org_{slug}"."individual_enrollment" DROP CONSTRAINT "enrollment_measure_measure_id_fk";
--> statement-breakpoint
ALTER TABLE "org_{slug}"."individual_enrollment" DROP CONSTRAINT "enrollment_coachee_user_id_fk";
--> statement-breakpoint
ALTER TABLE "org_{slug}"."individual_enrollment" DROP CONSTRAINT "enrollment_coach_coach_user_id_fk";
--> statement-breakpoint
ALTER TABLE "org_{slug}"."individual_enrollment" DROP CONSTRAINT "enrollment_measure_coachee_pk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."individual_enrollment" ADD CONSTRAINT "individual_enrollment_measure_coachee_pk" PRIMARY KEY("measure","coachee");--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure" ADD COLUMN "type" "measure_type" DEFAULT 'cohort' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."cohort_enrollment" ADD CONSTRAINT "cohort_enrollment_cohort_cohort_id_fk" FOREIGN KEY ("cohort") REFERENCES "org_{slug}"."cohort"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."cohort_enrollment" ADD CONSTRAINT "cohort_enrollment_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "org_{slug}"."user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."cohort" ADD CONSTRAINT "cohort_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."individual_enrollment" ADD CONSTRAINT "individual_enrollment_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."individual_enrollment" ADD CONSTRAINT "individual_enrollment_coachee_user_id_fk" FOREIGN KEY ("coachee") REFERENCES "org_{slug}"."user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."individual_enrollment" ADD CONSTRAINT "individual_enrollment_coach_coach_user_id_fk" FOREIGN KEY ("coach") REFERENCES "org_{slug}"."coach"("user_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
