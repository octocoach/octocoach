import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ComponentType } from "react";

type Component<T = {}> = () => Promise<JSX.Element> | ComponentType<T>;

export function withAuth<T = {}>(Component: Component<T>) {
  // TODO: Figure out how to avoid this type hack
  const C = Component as unknown as ComponentType<T>;
  const ComponentWithAuth = async (props: T) => {
    const session = await getServerSession(mkAuthOptions());

    if (!session?.user) {
      redirect("/api/auth/signin");
    }

    return <C {...props} />;
  };
  return ComponentWithAuth;
}
