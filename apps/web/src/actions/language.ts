"use server";

import { Locales } from "@octocoach/i18n/src/i18n-types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const saveLocale = async (locale: Locales) => {
  await cookies().set("locale", locale);
  revalidatePath("/", "layout");
};

export const getLocale = async () => {
  const locale = cookies().get("locale");
  return (locale?.value as Locales) || "en";
};
