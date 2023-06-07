"use client";

import { I18nContext } from "@octocoach/i18n/src/i18n-react";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadLocaleAsync } from "@octocoach/i18n/src/i18n-util.async";
import { Container, Stack, Typography } from "@octocoach/ui";
import { useContext, useEffect, useState } from "react";

export default function Accreditation() {
  const { LL, locale } = useContext(I18nContext);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // loadLocaleAsync(locale).then(() => {
    //   setLoaded(true);
    // });
  }, []);

  // if (!loaded) return null;

  return (
    <Container element="div">
      <Typography size="l" element="h1">
        {LL.ACCREDITATION()}
      </Typography>
      <Stack>
        <pre>{JSON.stringify(loadedLocales)}</pre>
      </Stack>
    </Container>
  );
}
