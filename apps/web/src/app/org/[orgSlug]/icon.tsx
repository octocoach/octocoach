import { db } from "@octocoach/db/connection";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export default async function Icon({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, orgSlug),
  });

  if (!organization?.logo) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: "black",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: organization?.primaryColor || "white",
          }}
        >
          {organization?.displayName
            ? organization.displayName.slice(0, 1)
            : ""}
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={organization.logo}
        style={{ width: "100%", height: "100%" }}
        alt="icon"
      />
    ),
    { ...size }
  );
}
