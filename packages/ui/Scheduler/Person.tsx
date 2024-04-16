"use client";

import Message from "@octocoach/i18n/src/react-message";

import { Text } from "../Text/Text";
import { person, personImage } from "./person.css";

export const Person = ({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
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
