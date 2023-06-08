"use client";

import { I18nContext } from "@octocoach/i18n/src/i18n-react";
import { Container, Typography } from "@octocoach/ui";
import { useContext } from "react";

export default function Accreditation() {
  const { LL } = useContext(I18nContext);

  return (
    <Container element="div">
      <Typography size="l" element="h1">
        {LL.ACCREDITATION()}
      </Typography>
    </Container>
  );
}
