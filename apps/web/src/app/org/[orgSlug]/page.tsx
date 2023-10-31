"use client";

import { useSession } from "@octocoach/auth/react";
import { Box, Button, Grid, PixelBackground, Stack, Text } from "@octocoach/ui";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import discover from "./_images/discover.png";
import grow from "./_images/grow.png";
import thrive from "./_images/thrive.png";
import debugImage from "./_images/woman-with-laptop.png";
import { useOrganization } from "./context";

const Section = ({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: StaticImageData;
}) => (
  <Stack align="center" spacing="tight">
    <Image src={src} height={200} width={200} alt={description} />

    <Text element="h2" size="xl" variation="casual" weight="semiBold">
      {title}
    </Text>

    <Text width={200} textAlign="center">
      {description}
    </Text>
  </Stack>
);

export default function Page({ params }: { params: { orgSlug } }) {
  const { data: session } = useSession();
  const organization = useOrganization();

  const getCTA = () =>
    !session?.user ? (
      <Link href={`/org/${params.orgSlug}/signup`}>
        <Button>Sign Up</Button>
      </Link>
    ) : (
      <Link href={`/org/${params.orgSlug}/start`}>
        <Button>Start Debugging</Button>
      </Link>
    );

  return (
    <PixelBackground pixelSize={20} backgroundColor="#1e1e2e">
      <Grid placeItems="center" gap="medium">
        <Image src={debugImage} width={500} height={500} alt="Debugging" />

        <Stack spacing="loose">
          <Stack spacing="tight">
            <Text element="h1" size="xl" weight="extraBlack">
              Debug your{" "}
              <span
                style={{
                  textDecoration: "underline wavy",
                  textDecorationColor: "#e78284",
                }}
              >
                career
              </span>
            </Text>
            <Text>
              At Q15, we delve into the code of your career aspirations, helping
              you articulate and debug the challenges between you and your ideal
              tech role.
            </Text>
            <Text>
              It's more than just landing a job; it's about navigating the
              experience paradox and ensuring your first professional chapters
              are written with logic, precision, and a dash of inspiration.
            </Text>
            <Text variation="casual">Ready to start debugging?</Text>
          </Stack>
          <Box textAlign="center" padding="none">
            {getCTA()}
          </Box>
        </Stack>
      </Grid>
      <Stack spacing="loose" align="center">
        <Text size="l" weight="light">
          Our Method
        </Text>
        <Stack
          direction="horizontal"
          align="left"
          wrap
          justify="center"
          spacing="loose"
        >
          <Section
            title="Discover"
            src={discover}
            description="Uncover your key interests, assess your current skills and identify areas for development to better align with your desired job in the tech industry."
          />
          <Section
            title="Grow"
            src={grow}
            description="Engage in personalized coaching, hands-on projects, and continuous feedback to bridge any skills gap, ensuring you're well-prepared and confident to tackle real-world challenges."
          />
          <Section
            title="Thrive"
            src={thrive}
            description="Secure a position that not only matches your skills and interests, but also propels you into a continuous learning and growth trajectory."
          />
        </Stack>
      </Stack>
    </PixelBackground>
  );
}
