"use server";

import { Locales } from "@octocoach/i18n/src/i18n-types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const saveLocale = (locale: Locales) => {
  return new Promise<void>((resolve) => {
    cookies().set("locale", locale);
    revalidatePath("/", "layout");
    resolve();
  });
};
