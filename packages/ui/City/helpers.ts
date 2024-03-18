interface Feature {
  properties: {
    city: string;
    result_type: string;
  };
}

export const autocomplete = async (text: string): Promise<string[]> => {
  if (text.trim().length < 3) return [];

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

  if (!apiKey) throw new Error("NEXT_PUBLIC_GEOAPIFY_KEY is not set");

  const geoapifyUrl = new URL(
    "https://api.geoapify.com/v1/geocode/autocomplete"
  );
  geoapifyUrl.searchParams.append("apiKey", apiKey);
  geoapifyUrl.searchParams.append("text", text.trim());
  geoapifyUrl.searchParams.append("filter", "countrycode:de");
  geoapifyUrl.searchParams.append("lang", "de");
  geoapifyUrl.searchParams.append("type", "city");
  geoapifyUrl.searchParams.append("limit", "10");

  const response = await (await fetch(geoapifyUrl)).json();

  const features: Feature[] = response.features || [];

  console.log(features);

  return features
    ?.filter(({ properties }) => properties.result_type === "city")
    .map(({ properties }) => properties.city);
};
