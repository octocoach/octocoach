import { Text } from "@octocoach/ui";

export default async function Page() {
  return (
    <main
      style={{
        height: "calc(100vh - 40px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Text>Welcome</Text>
    </main>
  );
}
