import { ZodNumber, ZodString, ZodType, ZodTypeAny, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const makeIdentifyer = <T extends ZodTypeAny>(id: T) =>
  z.object({
    id,
    name: z.string(),
  });

export const skillSchema = z.object({
  type: makeIdentifyer(z.string()).optional(),
  id: z.string(),
  name: z.string(),
  tags: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  infoUrl: z.string().url().optional(),
  isSoftware: z.boolean().optional(),
  isLanguage: z.boolean().optional(),
  description: z.string().optional(),
  category: makeIdentifyer(z.number().nonnegative()).optional(),
  subcategory: makeIdentifyer(z.number().nonnegative()).optional(),
});

export const taskSchema = z.object({
  description: z.string().describe("A plain text description of the task."),
  embeddings: z.array(z.number()),
});

export type Skill = z.infer<typeof skillSchema>;

export type Task = z.infer<typeof taskSchema>;
