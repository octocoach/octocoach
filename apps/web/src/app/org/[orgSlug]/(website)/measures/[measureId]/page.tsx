import { CertquaMeasureSeal } from "@components/certqua-seal/measure";
import { FillImage } from "@components/fill-image";
import { FundedByBA } from "@components/funded-by-ba";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { db, orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import {
  Box,
  ButtonLink,
  Card,
  Grid,
  Markdown,
  Stack,
  Text,
} from "@octocoach/ui";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMeasureWithInfoAndModules } from "../../helpers";

type PageParams = {
  params: { orgSlug: string; measureId: MeasureWithInfo["id"] };
};

export async function generateMetadata({
  params: { orgSlug, measureId },
}: PageParams): Promise<Metadata> {
  const locale = getLocale();

  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, orgSlug),
  });

  const { measureTable, measureInfoTable } = mkOrgSchema(orgSlug);

  const measure = await orgDb(orgSlug)
    .select({
      title: measureInfoTable.title,
      description: measureInfoTable.description,
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

  if (!measure) return {};

  return {
    title: measure.title,
    description: measure.description,
    openGraph: {
      locale,
      title: measure.title,
      description: measure.description,
      type: "website",
      siteName: organization?.displayName,
      url: organization?.domain
        ? `https://${organization.domain}/measures/${measureId}`
        : `https://octo.coach/org/${orgSlug}/measures/${measureId}/`,
    },
  };
}

const ApplyButton = ({ baseUrl, id }: { baseUrl: string; id: string }) => (
  <Box paddingY="medium">
    <Stack fullWidth align="center">
      <ButtonLink
        Element={Link}
        href={`${baseUrl}measures/${id}/apply`}
        glow
        size="large"
      >
        <Message id="enrollment.applyNow" />
      </ButtonLink>
    </Stack>
  </Box>
);

export default async function Page({
  params: { orgSlug, measureId },
}: PageParams) {
  const measure = await getMeasureWithInfoAndModules(orgSlug, measureId);

  if (!measure) notFound();

  const baseUrl = getBaseUrl();

  return (
    <Box marginY="medium">
      <Stack>
        <Grid gap="large" columns="auto" justifyItems="center">
          <FillImage
            src={measure.imageSrc}
            alt={measure.imageAlt}
            minHeight={200}
            roundedCorners
          />
          <Box>
            <Text size="xl" variation="casual">
              {measure.title}
            </Text>
            <Markdown>{measure.description}</Markdown>
          </Box>
        </Grid>
        {measure.accredited && (
          <Box marginY="small">
            <Stack
              direction="horizontal"
              align="center"
              justify="center"
              wrap
              spacing="loose"
            >
              <CertquaMeasureSeal />
              <FundedByBA />
            </Stack>
          </Box>
        )}
        <ApplyButton baseUrl={baseUrl} id={measure.id} />
        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.modules" />
        </Text>
        <Stack>
          {measure.modules.map((mod) => (
            <Card key={mod.id}>
              <Grid gap="large" columns="auto" justifyItems="center">
                <FillImage
                  src={mod.imageSrc}
                  alt={mod.imageAlt}
                  minHeight={200}
                  roundedCorners
                />
                <Box>
                  <Text size="l" weight="heavy">
                    {mod.title}
                  </Text>
                  <Markdown>{mod.description}</Markdown>
                </Box>
              </Grid>
            </Card>
          ))}
        </Stack>
        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.requirements" />
        </Text>
        <Card>
          <Markdown>{measure.requirements}</Markdown>
        </Card>
        <ApplyButton baseUrl={baseUrl} id={measure.id} />
      </Stack>
    </Box>
  );
}
