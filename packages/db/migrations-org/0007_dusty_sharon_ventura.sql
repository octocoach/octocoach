ALTER TABLE "org_{slug}"."measure_info" DROP CONSTRAINT IF EXISTS "measure_info_id_measure_id_fk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_module" DROP CONSTRAINT IF EXISTS "measure_module_measure_measure_id_fk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_module" DROP CONSTRAINT IF EXISTS "measure_module_module_module_id_fk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."enrollment" DROP CONSTRAINT IF EXISTS "enrollment_measure_measure_id_fk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."meeting" DROP CONSTRAINT IF EXISTS "meeting_measure_measure_id_fk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."module_info" DROP CONSTRAINT IF EXISTS "module_info_id_module_id_fk";--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" DROP CONSTRAINT "measure_info_slug_unique";--> statement-breakpoint
ALTER TABLE "org_{slug}"."enrollment" ALTER COLUMN "measure" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_module" ALTER COLUMN "measure" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_module" ALTER COLUMN "module" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."meeting" ALTER COLUMN "measure" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."module_info" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."module" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" DROP COLUMN IF EXISTS "slug";--> statement-breakpoint
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
 ALTER TABLE "org_{slug}"."enrollment" ADD CONSTRAINT "enrollment_measure_measure_id_fk" FOREIGN KEY ("measure") REFERENCES "org_{slug}"."measure"("id") ON DELETE restrict ON UPDATE cascade;
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