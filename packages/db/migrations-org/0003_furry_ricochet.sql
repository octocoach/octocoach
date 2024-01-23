DO $$ BEGIN
 CREATE TYPE "enrollment_status" AS ENUM('pending', 'declined', 'active', 'paused', 'completed', 'dropped-out');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."enrollment" (
	"measure" integer NOT NULL,
	"coachee" text NOT NULL,
	"coach" text,
	"status" "enrollment_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"start_date" date,
	"end_date" date,
	"comments" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."enrollment" ADD CONSTRAINT "enrollment_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."enrollment" ADD CONSTRAINT "enrollment_coachee_user_id_fk" FOREIGN KEY ("coachee") REFERENCES "org_{slug}"."user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."enrollment" ADD CONSTRAINT "enrollment_coach_coach_user_id_fk" FOREIGN KEY ("coach") REFERENCES "org_{slug}"."coach"("user_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
