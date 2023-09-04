import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import { Container, Stack, Text } from "@octocoach/ui";

export default function Header() {
  return (
    <Container element="header">
      <Stack direction="vertical" align="right">
        <ClerkLoading>
          <div>
            <Text>Loading Clerk...</Text>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton afterSignInUrl="/" />
          </SignedOut>
        </ClerkLoaded>
      </Stack>
    </Container>
  );
}
