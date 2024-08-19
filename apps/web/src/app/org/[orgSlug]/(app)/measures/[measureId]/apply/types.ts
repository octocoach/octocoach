import { Session } from "@octocoach/auth";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { Locales } from "@octocoach/i18n/src/i18n-types";

import { MeasureWithInfoParam } from "./page";

export type EnrollmentComponentProps = {
  orgSlug: Organization["slug"];
  measure: MeasureWithInfoParam;
  user: Session["user"];
  locale: Locales;
};
