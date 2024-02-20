"use client";

import { Room } from "@octocoach/daily/types";
import { Box, Button, Card, Stack, Text } from "@octocoach/ui";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Enrollment = {
  measure: number;
  coachee: string;
  firstName: string | null;
  lastName: string | null;
  title: string;
  status:
    | "paused"
    | "active"
    | "pending"
    | "declined"
    | "completed"
    | "dropped-out";
  startDate: Date | null;
  roomName: string | null;
};

export const EnrollmentRow = ({
  enrollment,
  createRoom,
}: {
  enrollment: Enrollment;
  createRoom: (
    enrollment: Pick<Enrollment, "measure" | "coachee">
  ) => Promise<Room>;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onCreateRoom = () => {
    startTransition(() => {
      createRoom(enrollment).then(() => {
        router.refresh();
      });
    });
  };

  return (
    <Card>
      <Stack>
        <Box>
          {enrollment.firstName} {enrollment.lastName} ({enrollment.status})
        </Box>
        <Box>
          {enrollment.roomName ? (
            <Text>Room: {enrollment.roomName}</Text>
          ) : (
            <Button onClick={onCreateRoom} disabled={isPending}>
              Create Room
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
