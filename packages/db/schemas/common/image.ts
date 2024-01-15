import z from "zod";

export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export type Image = z.infer<typeof imageSchema>;
