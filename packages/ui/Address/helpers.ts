const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

if (!apiKey) throw new Error("NEXT_PUBLIC_GEOAPIFY_KEY is not set");

export interface Feature {
  properties: {
    formatted: string;
    street: string;
    housenumber: string;
    city: string;
    postcode: string;
    state: string;
    result_type: "building";
  };
}

export const autocomplete = async (
  text: string,
  type?: "city" | "postcode" | "state"
): Promise<Feature[]> => {
  if (text.trim().length <= 3) return [];

  const geoapifyUrl = new URL(
    "https://api.geoapify.com/v1/geocode/autocomplete"
  );
  geoapifyUrl.searchParams.append("apiKey", apiKey);
  geoapifyUrl.searchParams.append("text", text.trim());
  geoapifyUrl.searchParams.append("filter", "countrycode:de");
  geoapifyUrl.searchParams.append("lang", "de");
  if (type) geoapifyUrl.searchParams.append("type", type);

  const response = (await (await fetch(geoapifyUrl)).json()) as {
    features: Feature[];
  };

  return response.features || [];
};
