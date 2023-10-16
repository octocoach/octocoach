ALTER TABLE "address" RENAME COLUMN "street" TO "address_line_1";--> statement-breakpoint
ALTER TABLE "address" RENAME COLUMN "housenumber" TO "address_line_2";--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "address_line_2" DROP NOT NULL;