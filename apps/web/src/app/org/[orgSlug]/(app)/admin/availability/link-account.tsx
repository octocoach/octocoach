"use client";

import { signIn } from "@octocoach/auth/react";
import { Button } from "@octocoach/ui";

export const LinkAccount = () => {
  const onClick = () => {
    void signIn("google");
  };

  return <Button onClick={onClick}>Link</Button>;
};
