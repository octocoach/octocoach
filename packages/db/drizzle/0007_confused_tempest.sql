CREATE TABLE IF NOT EXISTS "tasks_to_users" (
	"task_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"integer" integer NOT NULL,
	CONSTRAINT tasks_to_users_task_id_user_id PRIMARY KEY("task_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_to_users" ADD CONSTRAINT "tasks_to_users_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_to_users" ADD CONSTRAINT "tasks_to_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
