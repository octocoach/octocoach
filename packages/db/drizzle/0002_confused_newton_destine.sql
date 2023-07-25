ALTER TABLE "jobs" ADD COLUMN "description_original" text NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "created" timestamp DEFAULT now() NOT NULL;