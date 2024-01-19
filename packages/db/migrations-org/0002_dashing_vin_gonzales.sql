ALTER TABLE "org_{slug}"."measure_info" RENAME COLUMN "image" TO "image_alt";--> statement-breakpoint
ALTER TABLE "org_{slug}"."module_info" DROP CONSTRAINT "module_info_measure_module_module_id_fk";
--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" ALTER COLUMN "image_alt" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" ALTER COLUMN "image_alt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_module" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure" ADD COLUMN "image_src" text NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."module_info" ADD COLUMN "image_alt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."module" ADD COLUMN "units" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "org_{slug}"."module" ADD COLUMN "image_src" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_{slug}"."module_info" ADD CONSTRAINT "module_info_id_module_id_fk" FOREIGN KEY ("id") REFERENCES "org_{slug}"."module"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "org_{slug}"."module_info" DROP COLUMN IF EXISTS "measure_module";--> statement-breakpoint
ALTER TABLE "org_{slug}"."module_info" DROP COLUMN IF EXISTS "units";--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_info" ADD CONSTRAINT "measure_info_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "org_{slug}"."measure_module" ADD CONSTRAINT "measure_module_order_unique" UNIQUE("order");