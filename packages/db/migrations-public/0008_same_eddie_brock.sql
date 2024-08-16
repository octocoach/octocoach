ALTER TABLE "account" DROP CONSTRAINT "account_provider_provider_account_id";--> statement-breakpoint
ALTER TABLE "skills_missing_tasks" DROP CONSTRAINT "skills_missing_tasks_skill_missing_id_task_id";--> statement-breakpoint
ALTER TABLE "skills_tasks" DROP CONSTRAINT "skills_tasks_skill_id_task_id";--> statement-breakpoint
ALTER TABLE "verification_token" DROP CONSTRAINT "verification_token_identifier_token";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");--> statement-breakpoint
ALTER TABLE "skills_missing_tasks" ADD CONSTRAINT "skills_missing_tasks_skill_missing_id_task_id_pk" PRIMARY KEY("skill_missing_id","task_id");--> statement-breakpoint
ALTER TABLE "skills_tasks" ADD CONSTRAINT "skills_tasks_skill_id_task_id_pk" PRIMARY KEY("skill_id","task_id");--> statement-breakpoint
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token");