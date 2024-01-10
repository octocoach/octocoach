CREATE TABLE IF NOT EXISTS "org_{slug}"."measure_info" (
	"id" serial NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"requirements" text NOT NULL,
	"image" json,
	CONSTRAINT measure_info_id_locale_pk PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."measure_module" (
	"measure" integer NOT NULL,
	"module" integer NOT NULL,
	CONSTRAINT measure_module_measure_module_pk PRIMARY KEY("measure","module")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."measure" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."module_info" (
	"id" serial NOT NULL,
	"locale" "locale" NOT NULL,
	"measure_module" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"units" integer NOT NULL,
	CONSTRAINT module_info_id_locale_pk PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_{slug}"."module" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "org_{slug}"."account" DROP CONSTRAINT "account_provider_provider_account_id";--> statement-breakpoint
ALTER TABLE "org_{slug}"."content_locale" DROP CONSTRAINT "content_locale_id_locale";--> statement-breakpoint
ALTER TABLE "org_{slug}"."users_skill_levels" DROP CONSTRAINT "users_skill_levels_user_id_skill_id";--> statement-breakpoint
ALTER TABLE "org_{slug}"."users_task_interest" DROP CONSTRAINT "users_task_interest_user_id_task_id";--> statement-breakpoint
ALTER TABLE "org_{slug}"."verification_token" DROP CONSTRAINT "verification_token_identifier_token";--> statement-breakpoint
ALTER TABLE "org_{slug}"."coach" DROP CONSTRAINT "coach_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."coach" ADD CONSTRAINT "coach_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "org_{slug}"."user"("id") ON DELETE restrict ON UPDATE cascade;
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
 ALTER TABLE "org_{slug}"."module_info" ADD CONSTRAINT "module_info_measure_module_module_id_fk" FOREIGN KEY ("measure_module") REFERENCES "org_{slug}"."module"("id") ON DELETE cascade ON UPDATE cascade;
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
ALTER TABLE "org_{slug}"."account" ADD CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");--> statement-breakpoint
ALTER TABLE "org_{slug}"."content_locale" ADD CONSTRAINT "content_locale_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "org_{slug}"."users_skill_levels" ADD CONSTRAINT "users_skill_levels_user_id_skill_id_pk" PRIMARY KEY("user_id","skill_id");--> statement-breakpoint
ALTER TABLE "org_{slug}"."users_task_interest" ADD CONSTRAINT "users_task_interest_user_id_task_id_pk" PRIMARY KEY("user_id","task_id");--> statement-breakpoint
ALTER TABLE "org_{slug}"."verification_token" ADD CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token");