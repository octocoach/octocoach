import { Box, Text } from "@octocoach/ui";

export default function Page({ params }: { params: { orgSlug: string } }) {
  return (
    <Box textAlign="center">
      <Text size="l">Terms of Use</Text>
    </Box>
  );
}
