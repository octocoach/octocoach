import { getMeasureWithInfoAndModules } from "@app/org/[orgSlug]/(website)/helpers";
import { authOrRedirect } from "@helpers/auth";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Box, Grid, Stack, Text } from "@octocoach/ui";
import { nanoid } from "nanoid";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createEnrollment } from "./actions";

const cacheId = nanoid();

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
    }) => createEnrollment(orgSlug, measureId),
    [`enrollment-${cacheId}`]
  );

  const enrollment = await getEnrollment({
    orgSlug: params.orgSlug,
    measureId: measure.id,
  });

  return (
    <Box paddingX="medium" paddingY="large">
      <Grid placeItems="center" gap="medium">
        <Image
          src={measure.imageSrc}
          alt={measure.imageAlt}
          width={200}
          height={200}
        />

        <Stack>
          <Text size="xl" variation="casual">
            Welcome to {measure.title}
          </Text>
          {enrollment.status === "pending" && (
            <Message id="enrollment.status.pending" />
          )}
        </Stack>
      </Grid>
    </Box>
  );
}
