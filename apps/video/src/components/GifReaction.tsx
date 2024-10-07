import { Gif } from "@remotion/gif";
import { z } from "zod";

const gifPropsSchema = z.object({
  id: z.string(),
  width: z.number(),
  height: z.number(),
});

export const gifSchema = z.object({
  type: z.literal("gif"),
  props: gifPropsSchema,
});

export const GifReaction = ({
  id,
  width,
  height,
}: z.infer<typeof gifPropsSchema>) => {
  if (!id) return null;

  const src = `https://media.giphy.com/media/${id}/giphy.gif`;
  return <Gif src={src} style={{ width, height }} />;
};
