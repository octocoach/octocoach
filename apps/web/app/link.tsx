"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import NextLink from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

interface Props extends LinkProps {
  externalLink?: boolean;
}

export default function Link({ href, externalLink, ...props }: Props) {
  const { locale } = useI18nContext();

  const updatedHref = externalLink ? href : `/${locale}${href}`;

  return <NextLink href={updatedHref} {...props} />;
}
