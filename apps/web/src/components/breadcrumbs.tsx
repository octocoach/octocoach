"use client";

import { Stack, Text } from "@octocoach/ui";
import { ArrowRight } from "@octocoach/ui/icons";
import Link from "next/link";

export const Breadcrumbs = ({
  crumbs,
  baseUrl,
}: {
  crumbs: string[];
  baseUrl: string;
}) => {
  const isLast = (i: number) => i === crumbs.length - 1;

  return (
    <Stack direction="horizontal" align="center" wrap>
      {crumbs.map((crumb, i) => (
        <>
          <Text>
            {!isLast(i) ? (
              <Link href={`${baseUrl}${crumbs.slice(0, i + 1).join("/")}`}>
                {crumb}
              </Link>
            ) : (
              crumb
            )}
          </Text>

          {!isLast(i) ? <ArrowRight /> : null}
        </>
      ))}
    </Stack>
  );
};
