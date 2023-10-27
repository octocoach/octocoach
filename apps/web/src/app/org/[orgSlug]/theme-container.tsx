"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { assignInlineVars, vars } from "@octocoach/ui";
import {
  createColorAlphas,
  createThemeBase,
} from "@octocoach/ui/theme/creator";
import { ReactNode } from "react";

export default function ThemeContainer({
  children,
  organization,
}: {
  children: ReactNode;
  organization: Organization;
}) {
  const base = createThemeBase("frappe");

  return (
    <div
      style={assignInlineVars(vars, {
        ...base,
        color: {
          ...base.color,
          brand: createColorAlphas(organization.primaryColor),
          accent: createColorAlphas(organization.secondaryColor),
        },
      })}
    >
      {children}
    </div>
  );
}
