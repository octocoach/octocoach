import { addressTable } from "../common/address";
import { employerTable } from "../common/employer";
import { jobRelations, jobTable } from "../common/job";
import {
  mkOrganizationTable,
  mkOrganizationTableRelations,
} from "../common/organization";
import {
  skillCategoryRelations,
  skillCategoryTable,
} from "../common/skill-category";
import {
  skillMissingRelations,
  skillMissingTable,
} from "../common/skill-missing";
import {
  skillSubcategoryRelations,
  skillSubcategoryTable,
} from "../common/skill-subcategory";
import { skillTypeRelations, skillTypeTable } from "../common/skill-type";
import {
  skillsMissingTasksRelations,
  skillsMissingTasksTable,
} from "../common/skills-missing-tasks";
import { skillsTasksRelations, skillsTasksTable } from "../common/skills-tasks";
import { enrollmentStatusEnum } from "../data-types/enrollment";
import { localeEnum } from "../data-types/locale";
import {
  meetingAttendanceEnum,
  meetingRoleEnum,
  meetingTypeEnum,
} from "../data-types/meeting";
import { mkOrgAccountTable } from "./account";
import { mkCoachTable, mkCoachTableRelations } from "./coach";
import { mkContentLocaleTable, mkContentTable } from "./content";
import { mkEnrollmentTable } from "./enrollment";
import {
  mkMeasureInfoRelations,
  mkMeasureInfoTable,
  mkMeasureRelations,
  mkMeasureTable,
} from "./measure";
import {
  mkMeasureModuleRelations,
  mkMeasureModuleTable,
} from "./measure-module";
import { mkMeetingTable } from "./meeting";
import { mkMeetingParticipantTable } from "./meeting-participant";
import {
  mkModuleInfoRelations,
  mkModuleInfoTable,
  mkModuleTable,
} from "./module";
import { mkOrgSessionTable } from "./session";
import { mkSkillRelations, skillTable } from "./skill";
import { mkTaskRelations, taskTable } from "./task";
import { mkUserTable, mkUserTableRelations } from "./user";
import { mkUserProfileRelations, mkUserProfileTable } from "./user-profile";
import {
  mkUsersSkillLevelsRelations,
  mkUsersSkillLevelsTable,
} from "./users-skill-levels";
import {
  mkUsersTaskInterestRelations,
  mkUsersTaskInterestTable,
} from "./users-task-interest";
import { mkOrgVerificationTokenTable } from "./verification-token";

export const mkOrgSchema = (slug: string) => ({
  // auth
  accountTable: mkOrgAccountTable(slug),

  sessionTable: mkOrgSessionTable(slug),

  userTable: mkUserTable(slug),
  userTableRelations: mkUserTableRelations(slug),

  verificationTokenTable: mkOrgVerificationTokenTable(slug),

  // common
  userProfileTable: mkUserProfileTable(slug),
  userProfileRelations: mkUserProfileRelations(slug),

  organizationTable: mkOrganizationTable(mkUserTable(slug)),
  organizationTableRelations: mkOrganizationTableRelations(mkUserTable(slug)),

  addressTable,
  employerTable,

  jobTable,
  jobRelations,

  taskTable,
  taskRelations: mkTaskRelations(slug),

  skillTypeTable,
  skillTypeRelations,
  skillCategoryTable,
  skillCategoryRelations,
  skillSubcategoryTable,
  skillSubcategoryRelations,
  skillTable,
  skillRelations: mkSkillRelations(slug),
  skillMissingTable,
  skillMissingRelations,

  skillsTasksTable,
  skillsTasksRelations,
  skillsMissingTasksTable,
  skillsMissingTasksRelations,

  // org
  usersSkillLevelsTable: mkUsersSkillLevelsTable(slug),
  usersSkillLevelsRelations: mkUsersSkillLevelsRelations(slug),

  usersTaskInterestTable: mkUsersTaskInterestTable(slug),
  usersTaskInterestRelations: mkUsersTaskInterestRelations(slug),

  coachTable: mkCoachTable(slug),
  coachTableRelations: mkCoachTableRelations(slug),

  contentTable: mkContentTable(slug),
  localeEnum,
  contentLocaleTable: mkContentLocaleTable(slug),

  measureTable: mkMeasureTable(slug),
  measureRelations: mkMeasureRelations(slug),
  measureInfoTable: mkMeasureInfoTable(slug),
  measureInfoRelations: mkMeasureInfoRelations(slug),
  moduleTable: mkModuleTable(slug),
  moduleRelations: mkMeasureRelations(slug),
  moduleInfoTable: mkModuleInfoTable(slug),
  moduleInfoRelations: mkModuleInfoRelations(slug),
  measureModuleTable: mkMeasureModuleTable(slug),
  measureModuleRelations: mkMeasureModuleRelations(slug),
  enrollmentTable: mkEnrollmentTable(slug),
  enrollmentStatusEnum,

  // meeting
  meetingAttendanceEnum,
  meetingTypeEnum,
  meetingRoleEnum,
  meetingTable: mkMeetingTable(slug),
  meetingParticipantTable: mkMeetingParticipantTable(slug),
});
