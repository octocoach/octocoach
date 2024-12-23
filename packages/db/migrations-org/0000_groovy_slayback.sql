CREATE SCHEMA "org_{slug}";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "locale" AS ENUM('en', 'de');
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
	CONSTRAINT account_provider_provider_account_id PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."coach" (
	"user_id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."content_locale" (
	"id" text NOT NULL,
	"locale" "locale" NOT NULL,
	"value" json,
	CONSTRAINT content_locale_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."content" (
	"id" text PRIMARY KEY NOT NULL
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
	CONSTRAINT users_skill_levels_user_id_skill_id PRIMARY KEY("user_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."users_task_interest" (
	"user_id" text NOT NULL,
	"task_id" integer NOT NULL,
	"integer" integer NOT NULL,
	CONSTRAINT users_task_interest_user_id_task_id PRIMARY KEY("user_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verification_token_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."coach" ADD CONSTRAINT "coach_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE no action ON UPDATE no action;
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
