import { makeDb } from "@octocoach/db/src/connection";
import { Text } from "@octocoach/ui";
import shuffle from "just-shuffle";

export default async function Page() {
  const db = makeDb({ orgSlug: "q15" });

  const members = await db.query.members.findMany();

  return (
    <main
      style={{
        height: "calc(100vh - 40px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Text>{JSON.stringify(members)}</Text>
    </main>
  );
}
