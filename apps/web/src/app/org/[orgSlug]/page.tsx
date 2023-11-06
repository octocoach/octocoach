"use client";

import { Faq } from "@components/Faq";
import { useSession } from "@octocoach/auth/react";
import {
  Box,
  Button,
  Grid,
  Tagline,
  PixelBackground,
  Stack,
  Text,
  Markdown,
} from "@octocoach/ui";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import coachImage from "./_images/coach.png";
import discover from "./_images/discover.png";
import grow from "./_images/grow.png";
import thrive from "./_images/thrive.png";
import debugImage from "./_images/woman-with-laptop.png";
import { about, coach, faqs, heroText } from "./content";
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
    <img
      src={src.src}
      height={200}
      width={200}
      alt={description}
      style={{ imageRendering: "pixelated" }}
    />

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

  const [openQA, setOpenQA] = useState<number | null>(null);

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
    <>
      <PixelBackground>
        <Box paddingX="small">
          <Grid placeItems="center" gap="medium">
            <img
              src={debugImage.src}
              width={400}
              alt="Debugging"
              style={{ imageRendering: "pixelated" }}
            />

            <Stack spacing="loose">
              <Stack spacing="tight">
                <Tagline>{organization.tagLine}</Tagline>
                <Markdown>{heroText}</Markdown>
              </Stack>
              <Box textAlign="center" paddingX="none">
                {getCTA()}
              </Box>
            </Stack>
          </Grid>
        </Box>
      </PixelBackground>
      <PixelBackground pixelSize={20}>
        <Box>
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
        </Box>
      </PixelBackground>
      <PixelBackground pixelSize={40}>
        <Box paddingX="none">
          <Text element="h2" size="l" weight="bold">
            About Q15
          </Text>
          <Markdown>{about}</Markdown>
        </Box>
      </PixelBackground>
      <PixelBackground pixelSize={80}>
        <Box paddingX="none">
          <Stack align="center">
            <img
              src="https://kwplc549faxwhcci.public.blob.vercel-storage.com/image-removebg-preview-pWOP7xDhiQSU9CbsLcxlKbtcA37laM.png"
              style={{
                imageRendering: "pixelated",
                width: "clamp(280px, 50%, 400px)",
                minWidth: 280,
              }}
              alt="Adriaan"
            />
            <Box paddingX="none">
              <Text element="h2" size="l" weight="bold">
                Meet the coach
              </Text>
              <Markdown>{coach}</Markdown>
            </Box>
          </Stack>
        </Box>
      </PixelBackground>
      <Box paddingX="none">
        <Text element="h2" size="l" weight="bold">
          FAQs
        </Text>
        <Stack>
          {faqs.map((qa, idx) => (
            <Faq
              key={idx}
              qa={qa}
              idx={idx}
              onOpen={(i) => {
                if (openQA === idx) {
                  setOpenQA(null);
                } else {
                  setOpenQA(i);
                }
              }}
              isOpen={idx === openQA}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
}
