import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ComponentType } from "react";

export function withAuth(Component: ComponentType) {
  const ComponentWithAuth = async (props) => {
    const session = await getServerSession(mkAuthOptions());

    if (!session?.user) {
      redirect("/api/auth/signin");
    }

    return <Component {...props} />;
  };
  return ComponentWithAuth;
}
