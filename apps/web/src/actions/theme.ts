"use server";

import { Flavor } from "@octocoach/ui/theme/creator";
import { cookies } from "next/headers";

export const setTheme = async (theme: Flavor) => {
  cookies().set("theme", theme);
  return theme;
};

export const removeTheme = async () => {
  cookies().delete("theme");
  return;
};
