"use client";

import { ReactNode } from "react";
import { SSRProvider as Provider } from "react-aria";

export const SSRProvider = ({ children }: { children: ReactNode }) => (
  <Provider>{children}</Provider>
);
