DO $$ BEGIN
 CREATE TYPE "meeting_type" AS ENUM('consultation', 'coaching');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."meeting" (
	"id" serial PRIMARY KEY NOT NULL,
	"measure" integer NOT NULL,
	"coachee" text NOT NULL,
	"type" "meeting_type" NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting" ADD CONSTRAINT "meeting_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting" ADD CONSTRAINT "meeting_coachee_user_id_fk" FOREIGN KEY ("coachee") REFERENCES "org_{slug}"."user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
