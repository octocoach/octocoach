"use client";

import { Room } from "@octocoach/daily/types";
import { Box, Button, Card, Stack, Text } from "@octocoach/ui";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { IndividualEnrollment } from "./page";
import { ScreeningAnswersComponent } from "./screening-answers";

export const IndividualEnrollmentRow = ({
  enrollment: {
    measure,
    coachee,
    firstName,
    lastName,
    title,
    status,
    startDate,
    roomName,
    screeningAnswers,
  },
  createRoom,
}: {
  enrollment: IndividualEnrollment;
  createRoom: (
    enrollment: Pick<IndividualEnrollment, "measure" | "coachee">
  ) => Promise<Room>;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onCreateRoom = () => {
    startTransition(() => {
      void createRoom({ measure, coachee }).then(() => {
        router.refresh();
      });
    });
  };

  return (
    <Card>
      <Stack>
        <Text size="m">
          {firstName} {lastName} ({status})
        </Text>
        <Text>{title}</Text>
        <Text>{startDate?.toLocaleDateString()}</Text>
        <Box>
          {roomName ? (
            <Text>Room: {roomName}</Text>
          ) : (
            <Button onClick={onCreateRoom} disabled={isPending}>
              Create Room
            </Button>
          )}
        </Box>
        {screeningAnswers && (
          <ScreeningAnswersComponent answers={screeningAnswers} />
        )}
      </Stack>
    </Card>
  );
};
