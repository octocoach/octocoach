"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { ContentImage } from "@octocoach/db/schemas/org/content";
import { ReactNode, createContext, useContext } from "react";

export type OrganizationWithContent = Organization & {
  content: { id: string; image: ContentImage; value: unknown }[];
};

const OrganizationContext = createContext<OrganizationWithContent>(
  {} as OrganizationWithContent
);

export function OrganizationProvider({
  children,
  organization,
}: {
  children: ReactNode;
  organization: OrganizationWithContent;
}) {
  return (
    <OrganizationContext.Provider value={organization}>
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => useContext(OrganizationContext);
