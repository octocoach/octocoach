ALTER TABLE "tasks_to_users" RENAME TO "users_tasks_interest";--> statement-breakpoint
ALTER TABLE "users_tasks_interest" DROP CONSTRAINT "tasks_to_users_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "users_tasks_interest" DROP CONSTRAINT "tasks_to_users_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_tasks_interest" ADD CONSTRAINT "users_tasks_interest_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_tasks_interest" ADD CONSTRAINT "users_tasks_interest_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
