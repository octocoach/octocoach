import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { RedirectType, redirect } from "next/navigation";
import { ComponentType } from "react";

type Component<T = {}> = () => Promise<JSX.Element> | ComponentType<T>;

export function withAuth<T = {}>(Component: Component<T>) {
  console.log("hello");
  // TODO: Figure out how to avoid this type hack
  const C = Component as unknown as ComponentType<T>;
  const ComponentWithAuth = async (props: T) => {
    const session = await getServerSession(mkAuthOptions());

    if (!session?.user) {
      console.log("rediecting");
      redirect("/api/auth/signin", RedirectType.replace);
    }

    return <C {...props} />;
  };
  return ComponentWithAuth;
}
