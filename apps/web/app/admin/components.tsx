"use client";

import { Company } from "@octocoach/db/src/schema/companies";
import Image from "next/image";
import { useState } from "react";

export const Logo = ({ company, size }: { company: Company; size: number }) => {
  const { name, url } = company;

  const createSrc = (url: string) => `https://logo.clearbit.com/${url}`;

  const createFallbackSrc = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  const [src, setSrc] = useState(
    url ? createSrc(url) : createFallbackSrc(name)
  );

  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={`Logo for ${name}`}
      style={{
        backgroundColor: "white",
        borderColor: "transparent",
        width: size,
        maxHeight: size,
        borderRadius: size / 4,
      }}
      onError={() => setSrc(createFallbackSrc(name))}
    />
  );
};
