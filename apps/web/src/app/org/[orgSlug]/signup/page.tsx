import { withAuth } from "@components/withAuth";
import { Container, Text } from "@octocoach/ui";

export default withAuth(Page);

async function Page() {
  return (
    <Container element="section">
      <Text variation="heading" size="l">
        Sign Up
      </Text>
    </Container>
  );
}
