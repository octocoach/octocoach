import { mkCoachTable } from "./org/coach";
import { mkUserProfileTable } from "./org/user-profile";

const _userProfileTable = mkUserProfileTable("org");
export type UserProfile = typeof _userProfileTable.$inferSelect;
export type NewUserProfile = typeof _userProfileTable.$inferInsert;

const _coachTable = mkCoachTable("org");
export type Coach = typeof _coachTable.$inferSelect;
export type NewCoach = typeof _coachTable.$inferInsert;
