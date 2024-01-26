import { getMeasureWithInfoAndModules } from "@app/org/[orgSlug]/(website)/helpers";
import { authOrRedirect } from "@helpers/auth";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Box, PixelBackground, Stack, Text } from "@octocoach/ui";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { createEnrollment } from "./actions";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; measureSlug: string };
}) {
  const { user } = await authOrRedirect(params.orgSlug);
  const db = orgDb(params.orgSlug);

  const { userProfileTable, enrollmentTable } = mkOrgSchema(params.orgSlug);

  const profile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!profile) {
    const search = new URLSearchParams();
    search.set("origin", `/measures/${params.measureSlug}/apply`);
    orgRedirect(`signup?${search}`);
  }

  const measure = await getMeasureWithInfoAndModules(
    params.orgSlug,
    params.measureSlug
  );

  if (!measure) notFound();

  const getEnrollment = unstable_cache(
    async ({
      orgSlug,
      measureId,
    }: {
      orgSlug: string;
      measureId: Measure["id"];
    }) => {
      return createEnrollment(orgSlug, measureId);
    },
    [`enrollment-${params.measureSlug}-${user.id}`]
  );

  const enrollment = await getEnrollment({
    orgSlug: params.orgSlug,
    measureId: measure.id,
  });

  return (
    <PixelBackground>
      <Box>
        <Stack>
          <Text size="xl" variation="casual">
            {measure.title}
          </Text>
          <Text>Your enrollment is {enrollment.status}</Text>
        </Stack>
      </Box>
    </PixelBackground>
  );
}
