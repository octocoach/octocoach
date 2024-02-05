import type { Organization } from "@octocoach/db/schemas/common/organization";
import { ReactNode } from "react";
import { Text } from "../Text/Text";
import { logo, logoWrapper, nav, topBar } from "./nav.css";

export const Nav = ({
  organization,
  href,
  children,
}: {
  organization: Organization;
  href: string;
  children?: ReactNode;
}) => {
  return (
    <header className={topBar}>
      <a href={href}>
        <div className={logoWrapper}>
          {organization.logo ? (
            <img
              src={organization.logo}
              className={logo}
              alt={`${organization.displayName} logo`}
            />
          ) : null}
          <Text size="l" variation="heading">
            {organization.displayName}
          </Text>
        </div>
      </a>
      <nav className={nav}>{children}</nav>
    </header>
  );
};
