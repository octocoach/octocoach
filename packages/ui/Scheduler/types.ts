import { NewMeeting } from "@octocoach/db/schemas/org/meeting";

export type CreateMeetingParams = {
  meeting: NewMeeting;
  coachId: string;
};
