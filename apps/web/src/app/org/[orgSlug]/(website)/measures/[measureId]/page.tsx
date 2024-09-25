import { CertquaMeasureSeal } from "@components/certqua-seal/measure";
import { FillImage } from "@components/fill-image";
import { FundedByBA } from "@components/funded-by-ba";
import { sendFacebookConversionEvent } from "@helpers/facebook";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { db, orgDb } from "@octocoach/db/connection";
import { and, asc, eq } from "@octocoach/db/operators";
import { Cohort } from "@octocoach/db/schemas/org/cohort";
import {
  Measure,
  MeasureWithInfo,
  MeasureWithInfoAndModules,
} from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import { exhaustiveCheck } from "@octocoach/tshelpers";
import {
  Box,
  ButtonLink,
  Card,
  Grid,
  Markdown,
  Stack,
  Text,
} from "@octocoach/ui";
import { formatDate } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEndDate, getMeasureWithInfoAndModules } from "../../helpers";

type PageParams = {
  params: { orgSlug: string; measureId: MeasureWithInfo["id"] };
  searchParams: { fbclid?: string };
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

type ApplyButtonProps = {
  baseUrl: string;
  measureId: Measure["id"];
  cohortId?: Cohort["id"];
};

const ApplyButton = ({ baseUrl, measureId, cohortId }: ApplyButtonProps) => {
  let href = `${baseUrl}measures/${measureId}/apply`;

  if (cohortId) href = `${href}/cohort/${cohortId}`;

  return (
    <Box paddingY={cohortId ? "none" : "medium"}>
      <Stack fullWidth align="center">
        <ButtonLink Element={Link} href={href} glow size="medium">
          <Message id="enrollment.applyNow" />
        </ButtonLink>
      </Stack>
    </Box>
  );
};

const CohortsSection = async ({
  orgSlug,
  baseUrl,
  measure,
}: {
  orgSlug: string;
  baseUrl: string;
  measure: MeasureWithInfoAndModules;
}) => {
  const locales = {
    en: enUS,
    de: de,
  };
  const locale = getLocale();

  const db = orgDb(orgSlug);

  const { cohortTable } = mkOrgSchema(orgSlug);

  const cohorts = await db
    .select()
    .from(cohortTable)
    .where(eq(cohortTable.measure, measure.id))
    .orderBy(asc(cohortTable.startDate));

  return (
    <>
      <Text size="l" weight="light" element="h2">
        <Message id="enrollment.cohorts" />
      </Text>
      <Card>
        <Stack>
          {cohorts.map((cohort) => {
            const endDate = getEndDate(cohort.startDate, measure.duration);

            return (
              <Card key={cohort.id} surface="mantle">
                <Stack
                  spacing="tight"
                  direction="horizontal"
                  justify="between"
                  align="center"
                >
                  <Box>
                    <Text size="m" variation="casual">
                      {formatDate(cohort.startDate, "PP", {
                        locale: locales[locale],
                      })}
                    </Text>
                    <Text variation="casual" size="s" weight="light">
                      <Message id="enrollment.endsOn" />{" "}
                      {formatDate(endDate, "PP", { locale: locales[locale] })}
                    </Text>
                  </Box>

                  <ApplyButton
                    baseUrl={baseUrl}
                    measureId={measure.id}
                    cohortId={cohort.id}
                  />
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Card>
    </>
  );
};

const ApplySection = ({
  orgSlug,
  baseUrl,
  measure,
}: {
  orgSlug: string;
  baseUrl: string;
  measure: MeasureWithInfoAndModules;
}) => {
  switch (measure.type) {
    case "individual":
      return <ApplyButton baseUrl={baseUrl} measureId={measure.id} />;
    case "cohort":
      return (
        <CohortsSection baseUrl={baseUrl} measure={measure} orgSlug={orgSlug} />
      );
    default:
      return exhaustiveCheck(measure.type);
  }
};

export default async function Page({
  params: { orgSlug, measureId },
  searchParams: { fbclid },
}: PageParams) {
  const measure = await getMeasureWithInfoAndModules(orgSlug, measureId);

  if (!measure) notFound();

  const baseUrl = getBaseUrl();

  const totalUE = measure.modules.reduce((acc, curr) => acc + curr.units, 0);
  const rate = parseFloat(measure.rate);
  const cost = totalUE * rate;
  const weeks = measure.duration;
  const hoursPerWeek = Math.round((totalUE / weeks) * 0.75);

  if (fbclid) {
    await sendFacebookConversionEvent({
      fbclid,
      eventName: "ViewContent",
    });
  }

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

        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.atAGlance" />
        </Text>
        <Card>
          <Stack spacing="tight">
            <Box>
              <Text element="span" weight="bold">
                <Message id="enrollment.maxParticipants" />:{" "}
              </Text>
              <Text element="span" variation="casual">
                {measure.maxParticipants}
              </Text>
            </Box>
            <Box>
              <Text element="span" weight="bold">
                <Message id="enrollment.duration" />:{" "}
              </Text>
              <Text element="span" variation="casual">
                <Message id="enrollment.weeks" params={{ weeks }} />
              </Text>{" "}
              <Text element="span" size="s" weight="light">
                <Message
                  id="enrollment.hoursPerWeek"
                  params={{ hoursPerWeek }}
                />
              </Text>
            </Box>

            <Box>
              <Text element="span" weight="bold">
                <Message id="enrollment.cost" />:{" "}
              </Text>
              <Text element="span" variation="casual">
                {cost.toFixed(2)} €{" "}
                {measure.accredited ? (
                  <Text element="span" weight="light" size="s">
                    (<Message id="enrollment.funded" />)
                  </Text>
                ) : null}
              </Text>
            </Box>
          </Stack>
        </Card>
        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.requirements" />
        </Text>
        <Card>
          <Markdown>{measure.requirements}</Markdown>
        </Card>
        <ApplySection baseUrl={baseUrl} measure={measure} orgSlug={orgSlug} />
        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.curriculum" />
        </Text>
        <Card>
          <Stack spacing="loose">
            {measure.curriculumIntro && (
              <Markdown>{measure.curriculumIntro}</Markdown>
            )}
            <Stack>
              <Text size="l" weight="semiBold" element="h2" variation="casual">
                <Message id="enrollment.whatYoullLearn" />
              </Text>
              <Stack spacing="tight">
                {measure.modules.map((mod) => (
                  <Card key={mod.id} surface="mantle">
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
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
