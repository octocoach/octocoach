import { Stack, Text } from "@octocoach/ui";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const organization = await clerkClient.organizations.getOrganization({
    slug: params.slug,
  });

  const memberships =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: organization.id,
    });

  return (
    <div>
      <Image
        src={organization.imageUrl}
        alt={organization.name}
        width={80}
        height={80}
      />
      <Text size="xl">{organization.name}</Text>
      <Text size="s">{organization.slug}</Text>
      <Stack>
        {memberships.map(({ publicUserData, id }) => (
          <Text key={id}>
            {publicUserData.firstName} {publicUserData.lastName}{" "}
            {publicUserData.userId === organization.createdBy ? "(Owner)" : ""}
          </Text>
        ))}
      </Stack>
    </div>
  );
}
