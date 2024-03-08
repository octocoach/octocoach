ALTER TABLE "org_{slug}"."coach" ADD COLUMN "hours_buffer" integer DEFAULT 12 NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."coach" ADD COLUMN "availability" json;