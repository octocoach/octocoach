import { Text } from "../Text/Text";
import { logo, logoWrapper, nav } from "./nav.css";
import type { Organization } from "@octocoach/db/schemas/common/organization";

export const Nav = ({ organization }: { organization: Organization }) => {
  return (
    <nav className={nav}>
      <a href={`/org/${organization.slug}`}>
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
    </nav>
  );
};
