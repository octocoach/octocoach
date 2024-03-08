"use client";

import { Meeting } from "@octocoach/db/schemas/org/meeting";
import Message from "@octocoach/i18n/src/react-message";
import { Text } from "../Text/Text";
import { person, personImage } from "./person.css";

export const Person = ({
  name,
  image,
  meetingType,
}: {
  name?: string | null;
  image?: string | null;
  meetingType: Meeting["type"];
}) => {
  if (!name) return null;
  return (
    <div className={person}>
      {image && (
        <img src={image} alt={name || "coach"} className={personImage} />
      )}
      <Text>
        <Message id="meetings.newMeeting" />
      </Text>
      <Text size="l" variation="casual" weight="bold">
        {name || "a Coach"}
      </Text>
    </div>
  );
};
