import { Box, Card, Center, Container, Stack, Text } from "@octocoach/ui";
import Image from "next/image";

import logo from "./octocoach_logo.png";

export default function Page() {
  return (
    <Container>
      <Center>
        <Box marginY="large">
          <Stack align="center">
            <Image src={logo} width={200} height={200} alt="logo" />
            <Text
              variation="heading"
              weight="extraBlack"
              size="xl"
              textAlign="center"
            >
              OctoCoach
            </Text>
            <Text textAlign="center" variation="casual" size="l">
              A platform for managing AZAV coaching businesses.
            </Text>
            <Card>
              <Text textAlign="center">
                OctoCoach is an open source project, source code available{" "}
                <a
                  href="https://github.com/octocoach/octocoach/"
                  target="_blank"
                  style={{ textDecoration: "underline" }}
                  rel="noreferrer"
                >
                  here
                </a>
              </Text>
              <Text>
                For an example implementation of the platform, please visit{" "}
                <a
                  href="https://q15.co"
                  target="_blank"
                  style={{ textDecoration: "underline" }}
                  rel="noreferrer"
                >
                  q15.co
                </a>
              </Text>
            </Card>
          </Stack>
        </Box>
      </Center>
    </Container>
  );
}
