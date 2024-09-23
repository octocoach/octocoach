import { Gif } from "@remotion/gif";
import { z } from "zod";

const gifValueSchema = z.object({
  searchTerm: z.string(),
  src: z.string().optional(),
});

export const gifSchema = z.object({
  type: z.literal("gif"),
  value: gifValueSchema,
});

export const GifReaction = ({ value }: z.infer<typeof gifSchema>) => {
  if (!value.src) return null;
  return <Gif src={value.src} style={{ width: "100%" }} />;
};
