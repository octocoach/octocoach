ALTER TABLE "job" ADD COLUMN "updated" timestamp DEFAULT now();--> statement-breakpoint
UPDATE "job" SET "updated" = "created";--> statement-breakpoint
ALTER TABLE "job" ALTER COLUMN "updated" SET NOT NULL;