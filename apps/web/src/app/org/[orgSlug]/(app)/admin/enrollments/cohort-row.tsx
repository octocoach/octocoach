"use client";

import { Button, ButtonLink, Card, Stack, Text } from "@octocoach/ui";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useTransition } from "react";

import { CohortEnrollment } from "./page";
import { ScreeningAnswersComponent } from "./screening-answers";

export const CohortEnrollmentRow = ({
  enrollment: {
    cohort,
    title,
    status,
    startDate,
    user,
    email,
    firstName,
    lastName,
    screeningAnswers,
  },
  setCohortEnrollmentStatusAction,
}: {
  enrollment: CohortEnrollment;
  setCohortEnrollmentStatusAction: (
    enrollment: Pick<CohortEnrollment, "user" | "cohort">,
    status: CohortEnrollment["status"]
  ) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <Stack>
        <Text size="l" variation="casual">
          {firstName} {lastName} ({status})
        </Text>
        <Text>
          {title}: {formatDate(startDate, "dd.MM.yy")}
        </Text>
        {screeningAnswers && (
          <ScreeningAnswersComponent answers={screeningAnswers} />
        )}
        <Stack direction="horizontal" justify="right">
          <Button
            onClick={() =>
              startTransition(
                () =>
                  void setCohortEnrollmentStatusAction(
                    { user, cohort },
                    "declined"
                  )
              )
            }
            disabled={isPending}
            color="error"
          >
            Decline
          </Button>
          <Button
            onClick={() =>
              startTransition(
                () =>
                  void setCohortEnrollmentStatusAction(
                    { user, cohort },
                    "active"
                  )
              )
            }
            disabled={isPending}
            color="success"
          >
            Approve
          </Button>
          <ButtonLink Element={Link} href={`mailto:${email}`}>
            Contact
          </ButtonLink>
        </Stack>
      </Stack>
    </Card>
  );
};
