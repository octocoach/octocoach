"use client";

import { data } from "@octocoach/azav/src/expert-body/tuv-rheinland/data";
import type { SubjectArea } from "@octocoach/azav/src/expert-body/tuv-rheinland/schema";
import { I18nContext } from "@octocoach/i18n/src/i18n-react";
import { Card, Container, Stack, Typography } from "@octocoach/ui";
import { useContext } from "react";
import RM from "react-markdown";

export default function Accreditation() {
  const { LL, locale } = useContext(I18nContext);

  const s: SubjectArea = 1;

  return (
    <Container element="div">
      <Typography size="l" element="h1">
        {LL.ACCREDITATION()}
      </Typography>
      <Stack spacing="loose">
        {Object.entries(data).map(([id, val]) => {
          return (
            <Card key={id}>
              <Typography size="l" element="h2">
                {val.title[locale]}
              </Typography>

              <Stack spacing="loose">
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  {val.legalBasis?.map((x, i) => (
                    <Typography key={i}>
                      <a href={x.href}>{x.text}</a>
                    </Typography>
                  ))}
                </div>

                <Stack>
                  {val.tips
                    ?.filter(
                      ({ subjectAreas }) =>
                        !subjectAreas || subjectAreas.includes[s]
                    )
                    .map((t, i) => (
                      <Typography key={i}>{t.text[locale]}</Typography>
                    ))}
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}
