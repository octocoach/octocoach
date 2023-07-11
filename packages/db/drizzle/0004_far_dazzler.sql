ALTER TABLE "jobs" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "title_embedding" vector(1536) NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "description_embedding" vector(1536) NOT NULL;