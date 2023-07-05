CREATE TABLE IF NOT EXISTS "skills" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"info_url" text,
	"is_software" boolean,
	"is_language" boolean,
	"description" text,
	"subcategory" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "embeddings" TO "embedding";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_subcategory_skill_subcategories_id_fk" FOREIGN KEY ("subcategory") REFERENCES "skill_subcategories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
