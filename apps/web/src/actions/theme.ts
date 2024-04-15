"use server";

import { FlavorName } from "@octocoach/ui/theme/creator";
import { cookies } from "next/headers";

export const setTheme = async (theme: FlavorName) => {
  return new Promise<void>((resolve) => {
    cookies().set("theme", theme);
    resolve();
  });
};

export const removeTheme = async () => {
  return new Promise<void>((resolve) => {
    cookies().delete("theme");
    resolve();
  });
};
