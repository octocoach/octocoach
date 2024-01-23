"use client";

import { Address } from "@octocoach/db/schemas/common/address";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { SectionId } from "@octocoach/db/schemas/org/content";
import { MeasureWithInfoAndModules } from "@octocoach/db/schemas/org/measure";
import { ReactNode, createContext, useContext } from "react";

export type OrganizationWithContent = Organization & {
  address: Address;
  ownerName: string;
  content: { id: SectionId; value: unknown }[];
  measures: MeasureWithInfoAndModules[];
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
