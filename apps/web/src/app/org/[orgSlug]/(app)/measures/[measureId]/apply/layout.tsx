import { FillImage } from "@components/fill-image";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Box } from "@octocoach/ui/Box/Box";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params: { orgSlug, measureId },
}: {
  children: ReactNode;
  params: { orgSlug: string; measureId: string };
}) {
  const locale = getLocale();
  const db = orgDb(orgSlug);

  const { measureTable, measureInfoTable } = mkOrgSchema(orgSlug);

  const measure = await db
    .select({
      title: measureInfoTable.title,
      description: measureInfoTable.description,
      imageSrc: measureTable.imageSrc,
      imageAlt: measureInfoTable.imageAlt,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(measureTable.id, measureId))
    .then((rows) => rows[0] ?? null);

  if (!measure) notFound();

  return (
    <Box marginY="medium">
      <Stack>
        <Grid gap="large" columns="auto" placeItems="center">
          <FillImage
            src={measure.imageSrc}
            alt={measure.imageAlt}
            minHeight={150}
            roundedCorners
          />
          <Box>
            <Text size="l" weight="light" variation="casual">
              <Message id="measure.application.application" />
            </Text>
            <Text size="xl">{measure.title}</Text>
          </Box>
        </Grid>
        {children}
      </Stack>
    </Box>
  );
}
