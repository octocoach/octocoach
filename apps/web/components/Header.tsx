import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { Container, Stack } from "@octocoach/ui";

export const Header = () => (
  <Container element="header">
    <Stack direction="vertical" align="right">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/admin" />
      </SignedOut>
    </Stack>
  </Container>
);
