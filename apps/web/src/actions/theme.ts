"use server";

import { FlavorName } from "@octocoach/ui/theme/creator";
import { cookies } from "next/headers";

export const setTheme = async (theme: FlavorName) => {
  cookies().set("theme", theme);
  return theme;
};

export const removeTheme = async () => {
  cookies().delete("theme");
  return;
};
