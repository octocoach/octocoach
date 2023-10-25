"use client";

import { Icon, UilCheckCircle, UilQuestion } from "@iconscout/react-unicons";
import { getUserAccounts } from "@octocoach/auth/adapters";
import { signIn } from "@octocoach/auth/react";
import {
  Button,
  Card,
  Container,
  Stack,
  Text,
  UilDiscord,
  UilGithub,
  UilLinkedin,
  vars,
} from "@octocoach/ui";
import { ReactElement } from "react";

export type AsyncReturnType<T extends (..._args: any) => Promise<any>> =
  Awaited<ReturnType<T>>;

const getProviderIcon = (provider: string): ReactElement => {
  switch (provider) {
    case "github":
      return <UilGithub />;
    case "linkedin":
      return <UilLinkedin />;
    case "discord":
      return <UilDiscord />;
    default:
      return <UilQuestion />;
  }
};

export default function UserAccount({
  accounts,
}: {
  accounts: AsyncReturnType<typeof getUserAccounts>;
}) {
  return (
    <Container element="section">
      <Stack>
        <Text variation="heading">Please link your social accounts</Text>
        <Stack>
          {Object.entries(accounts).map(([key, provider]) => (
            <Card key={key}>
              <Stack direction="horizontal">
                <Stack direction="horizontal" spacing="tight" align="center">
                  {getProviderIcon(key)}
                  <Text size="l" variation="casual">
                    {provider.displayName}
                  </Text>
                </Stack>

                {!provider.dbAccount ? (
                  <Button onClick={() => signIn(key)}>Link Account</Button>
                ) : (
                  <UilCheckCircle color={vars.color.typography.success} />
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
