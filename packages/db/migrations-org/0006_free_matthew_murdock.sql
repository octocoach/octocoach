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
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."meeting_token" (
	"meeting" integer NOT NULL,
	"user" text NOT NULL,
	"token" text NOT NULL,
	CONSTRAINT meeting_token_meeting_user_pk PRIMARY KEY("meeting","user")
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting_token" ADD CONSTRAINT "meeting_token_meeting_meeting_id_fk" FOREIGN KEY ("meeting") REFERENCES "org_{slug}"."meeting"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."meeting_token" ADD CONSTRAINT "meeting_token_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "org_{slug}"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
