import { authOrRedirect } from "@helpers/auth";
import { db, orgDb } from "@octocoach/db/connection";
import { eq, inArray } from "@octocoach/db/operators";
import { whitelistedUsers } from "@octocoach/db/schemas/common/organization";
import {
  ContentLocale,
  mkContentLocaleTable,
  mkContentTable,
  websiteSectionsEnum,
} from "@octocoach/db/schemas/org/content";
import { Box, Text } from "@octocoach/ui";

import Admin from "./admin";
import { NewOrganization } from "./new-organization";

export default async function Page() {
  const session = await authOrRedirect();
  const { user } = session;

  const organization = await db.query.organizationTable.findFirst({
    where: (organization, { eq }) => eq(organization.owner, user.id),
  });

  if (organization) {
    const orgDB = orgDb(organization.slug);

    const contentTable = mkContentTable(organization.slug);
    const contentLocaleTable = mkContentLocaleTable(organization.slug);

    const content: ContentLocale[] = await orgDB
      .select({
        id: contentTable.id,
        locale: contentLocaleTable.locale,
        value: contentLocaleTable.value,
      })
      .from(contentTable)
      .innerJoin(contentLocaleTable, eq(contentTable.id, contentLocaleTable.id))
      .where(inArray(contentTable.id, websiteSectionsEnum.options));

    return <Admin organization={organization} content={content} />;
  }

  if (!user.email || !whitelistedUsers.includes(user.email)) {
    return (
      <Box textAlign="center">
        <Text size="xl" variation="casual">
          🥹 Sorry...
        </Text>
        <Text size="l">
          We are not accepting new organizations at this time, please check back
          soon
        </Text>
      </Box>
    );
  }

  return <NewOrganization />;
}
