CREATE SCHEMA "org_{slug}";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "enrollment_status" AS ENUM('pending', 'declined', 'active', 'paused', 'completed', 'dropped-out');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "locale" AS ENUM('en', 'de');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "org_{slug}"."account" (
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
	CONSTRAINT account_provider_provider_account_id_pk PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."coach" (
	"user_id" text PRIMARY KEY NOT NULL,
	"hours_buffer" integer DEFAULT 12 NOT NULL,
	"availability" json,
	"external_calendars" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."content_locale" (
	"id" text NOT NULL,
	"locale" "locale" NOT NULL,
	"value" json,
	CONSTRAINT content_locale_id_locale_pk PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."content" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."enrollment" (
	"measure" text NOT NULL,
	"coachee" text NOT NULL,
	"coach" text,
	"status" "enrollment_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"start_date" date,
	"end_date" date,
	"comments" text,
	"room_name" text,
	"screening_answers" json,
	CONSTRAINT enrollment_measure_coachee_pk PRIMARY KEY("measure","coachee")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."measure_info" (
	"id" text NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"requirements" text NOT NULL,
	"image_alt" text NOT NULL,
	"screening_questions" json,
	CONSTRAINT measure_info_id_locale_pk PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."measure_module" (
	"measure" text NOT NULL,
	"module" text NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT measure_module_measure_module_pk PRIMARY KEY("measure","module"),
	CONSTRAINT "measure_module_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."measure" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"image_src" text NOT NULL
);
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
	"measure" text NOT NULL,
	"type" "meeting_type" NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."module_info" (
	"id" text NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_alt" text NOT NULL,
	"content" jsonb,
	CONSTRAINT module_info_id_locale_pk PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."module" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"units" integer NOT NULL,
	"image_src" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."user_profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"city" text,
	"summary" text,
	"summary_hash" text,
	"terms_accepted" boolean,
	"email_communication_accepted" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"phone" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."users_skill_levels" (
	"user_id" text NOT NULL,
	"skill_id" text NOT NULL,
	"skill_level" "skill_level" NOT NULL,
	"created" timestamp DEFAULT now(),
	CONSTRAINT users_skill_levels_user_id_skill_id_pk PRIMARY KEY("user_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."users_task_interest" (
	"user_id" text NOT NULL,
	"task_id" integer NOT NULL,
	"integer" integer NOT NULL,
	CONSTRAINT users_task_interest_user_id_task_id_pk PRIMARY KEY("user_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verification_token_identifier_token_pk PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."coach" ADD CONSTRAINT "coach_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."content_locale" ADD CONSTRAINT "content_locale_id_content_id_fk" FOREIGN KEY ("id") REFERENCES "org_{slug}"."content"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."measure_info" ADD CONSTRAINT "measure_info_id_measure_id_fk" FOREIGN KEY ("id") REFERENCES "org_{slug}"."measure"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."measure_module" ADD CONSTRAINT "measure_module_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."measure_module" ADD CONSTRAINT "measure_module_module_module_id_fk" FOREIGN KEY ("module") REFERENCES "org_{slug}"."module"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."measure" ADD CONSTRAINT "measure_owner_coach_user_id_fk" FOREIGN KEY ("owner") REFERENCES "org_{slug}"."coach"("user_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."module_info" ADD CONSTRAINT "module_info_id_module_id_fk" FOREIGN KEY ("id") REFERENCES "org_{slug}"."module"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."module" ADD CONSTRAINT "module_owner_coach_user_id_fk" FOREIGN KEY ("owner") REFERENCES "org_{slug}"."coach"("user_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."users_skill_levels" ADD CONSTRAINT "users_skill_levels_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."users_skill_levels" ADD CONSTRAINT "users_skill_levels_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."users_task_interest" ADD CONSTRAINT "users_task_interest_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."users_task_interest" ADD CONSTRAINT "users_task_interest_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."__migrations" (
	id integer NOT NULL,
	created_at bigint
);