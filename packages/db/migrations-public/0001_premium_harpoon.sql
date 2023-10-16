DO $$ BEGIN
 CREATE TYPE "country" AS ENUM('de');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "organization_type" AS ENUM('EU', 'GbR', 'OHG', 'KG', 'GmbH', 'UG', 'AG', 'eG', 'gAG', 'gGmbH', 'PartG', 'KGaA', 'Verein', 'GmbHCoKG', 'GmbHCoOHG');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"country" "country" NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"postcode" text NOT NULL,
	"street" text NOT NULL,
	"housenumber" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organization" RENAME COLUMN "name" TO "display_name";--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "legal_name" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "type" "organization_type" DEFAULT 'EU' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "address_id" integer;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "domain" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "primary_color" text DEFAULT '#8839ef' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "secondary_color" text DEFAULT '#dc8a78' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "registration_number" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "tax_number" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "tag_line" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization" ADD CONSTRAINT "organization_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE no action ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
