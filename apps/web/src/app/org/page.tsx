import { getServerSessionOrRedirect } from "@helpers/auth";
import { db, orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import {
  SectionWithLocale,
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import Admin from "./admin";
import { NewOrganization } from "./new-organization";

export default async function Page() {
  const session = await getServerSessionOrRedirect();
  const { user } = session;

  const organization = await db.query.organizationTable.findFirst({
    where: (organization, { eq }) => eq(organization.owner, user.id),
  });

  const orgDB = orgDb(organization.slug);

  const contentTable = mkContentTable(organization.slug);
  const contentLocaleTable = mkContentLocaleTable(organization.slug);

  const content: SectionWithLocale[] = await orgDB
    .select({
      id: contentTable.id,
      locale: contentLocaleTable.locale,
      value: contentLocaleTable.value,
    })
    .from(contentTable)
    .innerJoin(contentLocaleTable, eq(contentTable.id, contentLocaleTable.id));

  if (organization)
    return <Admin organization={organization} content={content} />;

  return <NewOrganization />;
}
