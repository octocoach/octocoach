"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const api_host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!key || !api_host) throw new Error("Missing posthog key or host");

if (typeof window !== "undefined") {
  posthog.init(key, {
    api_host,
  });
}
export function CSPostHogProvider({ children }: { children: ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
