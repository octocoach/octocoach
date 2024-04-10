import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { availability as defaultAvailability } from "@octocoach/ui/Scheduler/constants";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { notFound } from "next/navigation";
import { CoachPreferences } from "./coach-preferences";
import { LinkAccount } from "./link-account";

export default async function Page({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const locale = getLocale();
  const { user } = await authOrRedirect(orgSlug);

  if (!user.email)
    throw new Error(`User ${user.id} is missing an email address`);

  const db = orgDb(orgSlug);
  const { accountTable, coachTable } = mkOrgSchema(orgSlug);

  const googleAccounts = await db
    .select()
    .from(accountTable)
    .where(
      and(eq(accountTable.userId, user.id), eq(accountTable.provider, "google"))
    )
    .then((rows) => rows[0] ?? null);

  const coach = await db
    .select()
    .from(coachTable)
    .where(eq(coachTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!coach) notFound();

  const availability = coach.availability ?? defaultAvailability;
  const externalCalendars = coach.externalCalendars ?? {
    google: { [user.email]: [] },
  };
  const hoursBuffer = coach.hoursBuffer ?? 12;

  return (
    <Stack>
      {!googleAccounts && <LinkAccount />}

      <CoachPreferences
        userId={user.id}
        userEmail={user.email}
        orgSlug={orgSlug}
        availability={availability}
        externalCalendars={externalCalendars}
        hoursBuffer={hoursBuffer}
        locale={locale}
      />
    </Stack>
  );
}
