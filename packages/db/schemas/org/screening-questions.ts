import { z } from "zod";

import { dbLocales } from "../data-types/locale";

export type ScreeningAnswers = z.infer<typeof screeningAnswersSchema>;

export const screeningAnswersSchema = z.object({
  locale: z.enum(dbLocales),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string().or(z.array(z.string())),
    })
  ),
});
