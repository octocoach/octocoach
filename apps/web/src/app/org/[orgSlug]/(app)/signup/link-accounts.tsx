"use client";

import { OAuthProvidersWithAccount } from "@octocoach/auth";
import { signIn } from "@octocoach/auth/react";
import { getEntries } from "@octocoach/tshelpers";
import { Button, Card, Container, Stack, Text, vars } from "@octocoach/ui";
import * as Icon from "@octocoach/ui/icons";
import { ReactElement } from "react";

const getProviderIcon = (provider: string): ReactElement => {
  switch (provider) {
    case "github":
      return <Icon.LogoGithub size="32" />;
    case "linkedin":
      return <Icon.LogoLinkedin size="32" />;
    case "discord":
      return <Icon.LogoDiscord size="32" />;
    default:
      return <Icon.Help size="32" />;
  }
};

export default function LinkAccounts({
  accounts,
}: {
  accounts: OAuthProvidersWithAccount;
}) {
  return (
    <Container element="section">
      <Stack>
        <Text variation="heading">Please link your social accounts</Text>
        <Stack>
          {getEntries(accounts).map(([key, provider]) => (
            <Card key={key}>
              <Stack direction="horizontal">
                <Stack direction="horizontal" spacing="tight" align="center">
                  {getProviderIcon(key)}
                  <Text size="l" variation="casual">
                    {provider.displayName}
                  </Text>
                </Stack>

                {!provider.dbAccount ? (
                  <Button onClick={() => void signIn(key)}>Link Account</Button>
                ) : (
                  <Icon.CheckmarkFilled
                    size="32"
                    color={vars.color.typography.success}
                  />
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
