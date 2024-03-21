import { orgDb } from "@octocoach/db/connection";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params: { orgSlug, measureId },
}: {
  params: { orgSlug: string; measureId: Measure["id"] };
}) {
  const db = orgDb(orgSlug);

  const measure = await db.query.measureTable.findFirst({
    where: (table, { eq }) => eq(table.id, measureId),
  });

  return new ImageResponse(
    (
      <img
        src={measure?.imageSrc || ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          imageRendering: "pixelated",
        }}
      />
    ),
    { ...size }
  );
}
