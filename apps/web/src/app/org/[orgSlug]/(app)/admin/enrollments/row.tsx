"use client";

import { Room } from "@octocoach/daily/types";
import { ScreeningAnswers } from "@octocoach/db/schemas/org/screening-questions";
import { Box, Button, Card, Markdown, Stack, Tag, Text } from "@octocoach/ui";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Enrollment = {
  measure: string;
  coachee: string;
  firstName: string | null;
  lastName: string | null;
  title: string;
  status:
    | "paused"
    | "active"
    | "pending"
    | "declined"
    | "rejected"
    | "completed"
    | "dropped-out";
  startDate: Date | null;
  roomName: string | null;
  screeningAnswers?: ScreeningAnswers | null;
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
      void createRoom(enrollment).then(() => {
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
        <Card surface="mantle">
          <Stack>
            {enrollment.screeningAnswers?.questions.map(
              ({ question, answer }, i) => (
                <Box key={i}>
                  <Text weight="light">{question}</Text>
                  {Array.isArray(answer) ? (
                    answer.map((a, i) => <Tag key={i}>{a}</Tag>)
                  ) : (
                    <Markdown>{answer}</Markdown>
                  )}
                </Box>
              )
            )}
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
};
