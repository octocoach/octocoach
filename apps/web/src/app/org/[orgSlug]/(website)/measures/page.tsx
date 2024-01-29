import { Measures } from "@components/measures";
import { getBaseUrl } from "@helpers/navigation";
import { getMeasuresWithInfo } from "../helpers";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const baseUrl = getBaseUrl();
  const measures = await getMeasuresWithInfo(params.orgSlug);
  return <Measures measures={measures} baseUrl={baseUrl} />;
}
