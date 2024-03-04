import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Text } from "../Text/Text";
import { person, personImage } from "./person.css";
import { Meeting } from "@octocoach/db/schemas/org/meeting";

export const Person = ({
  name,
  image,
  meetingType,
}: {
  name: string;
  image: string;
  meetingType: Meeting["type"];
}) => {
  const { LL } = useI18nContext();

  const type = LL.meetings.type[meetingType]();

  return (
    <div className={person}>
      <img src={image} alt={name} className={personImage} />
      <Text size="l" variation="casual">
        {LL.meetings.newMeeting({ name, type })}
      </Text>
    </div>
  );
};
