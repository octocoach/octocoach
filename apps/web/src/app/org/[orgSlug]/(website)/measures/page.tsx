import { Measures } from "@components/measures";
import { getBaseUrl } from "@helpers/navigation";

import type { Params } from "../../types";
import { getMeasuresWithInfo } from "../helpers";

export default async function Page({ params: { orgSlug } }: Params) {
  const baseUrl = getBaseUrl();
  const measures = await getMeasuresWithInfo(orgSlug);
  return <Measures measures={measures} baseUrl={baseUrl} />;
}
