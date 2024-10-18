import * as icons from "simple-icons";
import { z } from "zod";

import { c } from "../helpers";

const slugEnum = z.enum([
  "anthropic",
  "astro",
  "css3",
  "html5",
  "javascript",
  "nextdotjs",
  "openai",
  "react",
  "typescript",
]);

export const simpleIconPropsSchema = z.object({
  slug: slugEnum.describe("The icon to display"),
  size: z.number().describe("The size of the icon in pixels"),
});

export const simpleIconSchema = z
  .object({
    type: z.literal("simpleIcon"),
    props: simpleIconPropsSchema,
  })
  .describe("A simple icon");

export const SimpleIcon = ({
  slug,
  size,
}: z.infer<typeof simpleIconPropsSchema>) => {
  const icon = Object.values(icons).find(({ slug: s }) => s === slug);
  if (!icon) throw new Error(`Icon ${slug} not found`);

  return (
    <div style={{ display: "flex", placeItems: "center", gap: size * 0.1 }}>
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        fill={`#${icon.hex}`}
        viewBox="0 0 24 24"
        width={size}
        height={size}
      >
        <path d={icon.path} />
      </svg>
      <div
        style={{ fontSize: size * 0.5, color: c("text"), textWrap: "nowrap" }}
      >
        {icon.title}
      </div>
    </div>
  );
};
