import { Gif } from "@remotion/gif";
import { z } from "zod";

const gifPropsSchema = z.object({
  searchTerm: z.string(),
  src: z.string().optional(),
});

export const gifSchema = z.object({
  type: z.literal("gif"),
  props: gifPropsSchema,
});

export const GifReaction = ({ src }: z.infer<typeof gifPropsSchema>) => {
  if (!src) return null;
  return <Gif src={src} style={{ width: "100%" }} />;
};
