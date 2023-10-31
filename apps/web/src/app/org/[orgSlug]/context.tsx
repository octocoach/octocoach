"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { ReactNode, createContext, useContext } from "react";

const OrganizationContext = createContext<Organization>({} as Organization);

export function OrganizationProvider({
  children,
  organization,
}: {
  children: ReactNode;
  organization: Organization;
}) {
  return (
    <OrganizationContext.Provider value={organization}>
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => useContext(OrganizationContext);
