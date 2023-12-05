import { getBaseUrl } from "@helpers/navigation";
import { ButtonLink, Grid, Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import Link from "next/link";
import adriaan from "../../../../../adriaan_64.png";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const baseUrl = getBaseUrl();

  return (
    <Stack>
      <Grid>
        <Image
          src={adriaan}
          style={{ imageRendering: "pixelated" }}
          width={512}
          height={512}
          alt="Adriaan"
        />
        <Stack>
          <>
            <Text size="l">Hi, I'm Adriaan!</Text>
            <Text>
              Let's begin a quick journey to discover which tech tasks excite
              you. Just share what you're drawn to—no right or wrong answers
              here. Next, we'll casually gauge your skills. Think of it as a
              self-reflection on your experience, from beginner steps to expert
              strides. Your open and honest insights will help us identify the
              jobs that suit you and the skills you might want to develop.
            </Text>
            <Text>
              Ready to embark on this discovery? Your future job awaits!
            </Text>
          </>
          <Stack direction="horizontal" justify="right">
            <ButtonLink
              href={`${baseUrl}discover`}
              text="Let's Go"
              Element={Link}
            />
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
}
