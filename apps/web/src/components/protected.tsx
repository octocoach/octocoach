"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function Protected({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  if (!session?.user) {
    redirect("/");
  }

  return <>{children}</>;
}
