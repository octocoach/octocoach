"use client";

import { Text } from "@octocoach/ui";

export const Time = () => (
  <pre>{JSON.stringify(Intl.DateTimeFormat().resolvedOptions(), null, 2)}</pre>
);
