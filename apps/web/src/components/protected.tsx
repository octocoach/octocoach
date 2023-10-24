"use client";

import { useSession } from "@octocoach/auth/react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function Protected({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  if (!session?.user) {
    redirect("/");
  }

  return <>{children}</>;
}
