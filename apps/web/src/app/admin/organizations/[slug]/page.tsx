import { Text } from "@octocoach/ui";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Text>Organization Name</Text>
      <Text>List of members</Text>
    </div>
  );
}
