ALTER TABLE "organization" DROP CONSTRAINT "organization_address_id_address_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization" ADD CONSTRAINT "organization_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE cascade ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
