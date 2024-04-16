import { useParticipantProperty } from "@daily-co/daily-react";
import { Text } from "@octocoach/ui";

import { usernameClass } from "./username.css";

export const Username = ({
  id,
  isLocal,
}: {
  id: string;
  isLocal?: boolean;
}) => {
  const username = useParticipantProperty(id, "user_name");

  return (
    <div className={usernameClass}>
      <Text size="s">
        {username} {isLocal && "(you)"}
      </Text>
    </div>
  );
};
