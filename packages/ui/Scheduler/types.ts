import { NewMeeting } from "@octocoach/db/schemas/org/meeting";

export type CreateMeetingParams = {
  meeting: NewMeeting;
  coachId: string;
};

export type Time = {
  hh: number;
  mm: number;
};

export type Slot = {
  startTime: Time;
  endTime: Time;
};

export type Availability = Record<number, Slot[]>;
