DO $$ BEGIN
 CREATE TYPE "meeting_attendance" AS ENUM('present', 'absent_unexcused', 'absent_excused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "meeting_role" AS ENUM('coach', 'coachee');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "meeting_type" AS ENUM('consultation', 'coaching');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."meeting_participant" (
	"meeting" text NOT NULL,
	"user" text NOT NULL,
	"role" "meeting_role" DEFAULT 'coachee' NOT NULL,
	"accepted" boolean DEFAULT false NOT NULL,
	"attendance" "meeting_attendance",
	"attendance_info" text,
	"created" timestamp DEFAULT now(),
	"updated" timestamp DEFAULT now(),
	CONSTRAINT meeting_participant_meeting_user_pk PRIMARY KEY("meeting","user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."meeting" (
	"id" text PRIMARY KEY NOT NULL,
	"measure" integer NOT NULL,
	"type" "meeting_type" NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting_participant" ADD CONSTRAINT "meeting_participant_meeting_meeting_id_fk" FOREIGN KEY ("meeting") REFERENCES "org_{slug}"."meeting"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting_participant" ADD CONSTRAINT "meeting_participant_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "org_{slug}"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting" ADD CONSTRAINT "meeting_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
