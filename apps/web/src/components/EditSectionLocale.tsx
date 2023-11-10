"use client";

import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Box, FormField, FormInput, StringLike, Text } from "@octocoach/ui";

export const EditSectionLocale = ({
  hasImage,
  locale,
}: {
  hasImage?: boolean;
  locale: Locales;
}) => {
  const locales = {
    en: "English",
    de: "Deutsch",
  };
  return (
    <Box paddingX="none" grow>
      <Text size="l">{locales[locale]}</Text>
      {hasImage && (
        <FormField name={`alt_${locale}`} label="Alt Text">
          <FormInput name={`alt_${locale}`} />
        </FormField>
      )}
      <FormField name={`title_${locale}`} label="Title">
        <FormInput name={`title_${locale}`} />
      </FormField>
      <FormField name={`text_${locale}`} label="Text">
        <FormInput
          name={`text_${locale}`}
          render={<textarea style={{ height: "10rem" }} />}
        />
      </FormField>
    </Box>
  );
};
