DO $$ BEGIN
 CREATE TYPE "public"."module_type" AS ENUM('occupational', 'general');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure" ADD COLUMN "duration" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure" ADD COLUMN "max_participants" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure" ADD COLUMN "rate" numeric(5, 2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."module" ADD COLUMN "type" "module_type" DEFAULT 'occupational' NOT NULL;