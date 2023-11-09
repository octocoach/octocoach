"use client";

import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Box, FormField, FormInput, StringLike, Text } from "@octocoach/ui";

export const EditSection = ({
  altText,
  locale,
  text,
  title,
}: {
  altText?: StringLike;
  locale: Locales;
  text: StringLike;
  title: StringLike;
}) => {
  const locales = {
    en: "English",
    de: "Deutsch",
  };
  return (
    <Box paddingX="none" grow>
      <Text size="l">{locales[locale]}</Text>
      {!!altText && (
        <FormField name={altText} label="Alt Text">
          <FormInput name={altText} />
        </FormField>
      )}
      <FormField name={title} label="Title">
        <FormInput name={title} />
      </FormField>
      <FormField name={text} label="Text">
        <FormInput
          name={text}
          render={<textarea style={{ height: "10rem" }} />}
        />
      </FormField>
    </Box>
  );
};
