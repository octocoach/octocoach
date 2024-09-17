import { json, primaryKey, text } from "drizzle-orm/pg-core";
import { z } from "zod";

import { mkOrgPgSchema } from "../common/pg-schema";
import { localeEnum } from "../data-types/locale";

export type Content = ReturnType<typeof mkContentTable>["$inferSelect"];
export type NewContent = ReturnType<typeof mkContentTable>["$inferInsert"];
export type ContentLocale = ReturnType<
  typeof mkContentLocaleTable
>["$inferSelect"];
export type NewContentLocale = ReturnType<
  typeof mkContentLocaleTable
>["$inferInsert"];

export type ContentLocaleTypeOf<T> = Omit<ContentLocale, "value"> & {
  value: T;
};

export const websiteSectionsEnum = z.enum([
  "about",
  "faq",
  "hero",
  "method",
  "mission",
  "testimonials",
]);

export type SectionId = z.infer<typeof websiteSectionsEnum>;

const contentImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});
export type ContentImage = z.infer<typeof contentImageSchema>;

export const sectionContentSimpleSchema = z.object({
  title: z.string(),
  text: z.string(),
});
export type SectionContentSimple = z.infer<typeof sectionContentSimpleSchema>;

export const sectionContentWithImageSchema = z
  .object({
    image: contentImageSchema,
  })
  .merge(sectionContentSimpleSchema);
export type SectionContentWithImage = z.infer<
  typeof sectionContentWithImageSchema
>;

export const sectionContentWithSubSectionsSchema = z.object({
  title: z.string(),
  subSections: z.array(sectionContentWithImageSchema),
});
export type SectionContentWithSubSections = z.infer<
  typeof sectionContentWithSubSectionsSchema
>;

export const faqQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export type FAQQuestion = z.infer<typeof faqQuestionSchema>;

export const sectionContentFAQSchema = z.object({
  title: z.string(),
  questions: z.array(faqQuestionSchema),
});
export type SectionContentFAQ = z.infer<typeof sectionContentFAQSchema>;

const sectionContentSchema = z.union([
  sectionContentSimpleSchema,
  sectionContentWithImageSchema,
  sectionContentWithSubSectionsSchema,
  sectionContentFAQSchema,
]);

export type SectionContent = z.infer<typeof sectionContentSchema>;

const localeEnumSchema = z.object({
  locale: z.enum(localeEnum.enumValues),
});

export const sectionContentLocaleSchema = z.intersection(
  z.discriminatedUnion("id", [
    z.object({
      id: z.literal("about"),
      value: sectionContentSimpleSchema,
    }),

    z.object({
      id: z.literal("faq"),
      value: sectionContentFAQSchema,
    }),

    z.object({
      id: z.literal("hero"),
      value: sectionContentWithImageSchema,
    }),

    z.object({
      id: z.literal("testimonials"),
      value: sectionContentWithSubSectionsSchema,
    }),

    z.object({
      id: z.literal("mission"),
      value: sectionContentSimpleSchema,
    }),
  ]),
  localeEnumSchema
);

export type SectionContentLocale = z.infer<typeof sectionContentLocaleSchema>;

export const mkContentTable = (slug: string) => {
  return mkOrgPgSchema(slug).table("content", {
    id: text("id").notNull().primaryKey().$type<SectionId>(),
  });
};

export const mkContentLocaleTable = (slug: string) => {
  const contentTable = mkContentTable(slug);

  return mkOrgPgSchema(slug).table(
    "content_locale",
    {
      id: text("id")
        .notNull()
        .references(() => contentTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        })
        .$type<SectionId>(),
      locale: localeEnum("locale").notNull(),
      value: json("value").$type<SectionContent>(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.id, table.locale] }),
    })
  );
};
