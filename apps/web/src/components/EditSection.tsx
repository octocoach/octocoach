"use client";

import { ContentLocale, SectionId } from "@octocoach/db/schemas/org/content";
import { locales } from "@octocoach/i18n/src/i18n-util";
import { Box, Button, Form, Stack, Text, useFormStore } from "@octocoach/ui";
import { getContentByLocale } from "@octocoach/ui/helpers";
import { useTransition } from "react";
import { saveContent } from "src/actions/content";
import { EditSectionLocale } from "./EditSectionLocale";
import Upload from "./Upload";

export const EditSection = ({
  id,
  name,
  section,
  slug,
}: {
  id: SectionId;
  name: string;
  section: ContentLocale[];
  slug: string;
}) => {
  let imgSrc = "";
  // TODO: This components my be deleted

  const defaultValues = {};
  // const defaultValues = locales.reduce((acc, locale) => {
  //   const sectionLocale = getContentByLocale(section, locale);

  //   const value = {
  //     [`title_${locale}`]: sectionLocale.title,
  //     [`text_${locale}`]: sectionLocale.text,
  //   };

  //   if ("image" in sectionLocale) {
  //     if (!imgSrc) {
  //       imgSrc = sectionLocale.image.src;
  //       value["src"] = imgSrc;
  //     }
  //     value[`alt_${locale}`] = sectionLocale.image.alt;
  //   }

  //   return { ...acc, ...value };
  // }, {});

  const [isPending, startTransition] = useTransition();

  const store = useFormStore({ defaultValues });
  const saveContentWithSlug = saveContent.bind("data", { slug, id });

  return (
    <Box paddingX="none" paddingY="none">
      <Form
        store={store}
        onSubmit={async (data) => {
          startTransition(async () => {
            console.log(data);
            await saveContentWithSlug(data);
          });
        }}
      >
        <Text size="l">{name}</Text>
        {!!imgSrc && (
          <>
            <img src={imgSrc} />
            <Upload
              onUploaded={(url) => {
                store.setValue("src", url);
              }}
            />
          </>
        )}
        <Stack direction="horizontal">
          <EditSectionLocale locale="en" hasImage={!!imgSrc} />
          <EditSectionLocale locale="de" hasImage={!!imgSrc} />
        </Stack>
        <Button type="submit" disabled={isPending}>
          Save Section
        </Button>
      </Form>
    </Box>
  );
};
