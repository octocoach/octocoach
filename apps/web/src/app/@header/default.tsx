import {
  ClerkLoaded,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Container, Stack } from "@octocoach/ui";

export const runtime = "nodejs";

export default function Page() {
  return (
    <Container element="header">
      <Stack direction="vertical" align="right">
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
