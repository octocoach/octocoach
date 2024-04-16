import { request } from "undici";
import { z, ZodTypeAny } from "zod";

const client_id = process.env.LIGHTCAST_CLIENT_ID;
const client_secret = process.env.LIGHTCAST_SECRET;

if (!client_id || !client_secret) {
  throw new Error("No client id or secret");
}

const makeIdentifyer = <T extends ZodTypeAny>(id: T) =>
  z.object({
    id,
    name: z.string(),
  });

const lightcastSchema = z.object({
  category: makeIdentifyer(z.number().nonnegative()),
  description: z.string().optional(),
  id: z.string(),
  infoUrl: z.string().url(),
  isLanguage: z.boolean(),
  isSoftware: z.boolean(),
  name: z.string(),
  subcategory: makeIdentifyer(z.number().nonnegative()),
  type: makeIdentifyer(z.string()),
});

export type LightcastSkill = z.infer<typeof lightcastSchema>;

export const getAccessToken = async (): Promise<string> => {
  const body = new URLSearchParams({
    client_id,
    client_secret,
    grant_type: "client_credentials",
    scope: "emsi_open",
  }).toString();

  const { statusCode, body: responseBody } = await request(
    "https://auth.emsicloud.com/connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  if (statusCode !== 200) {
    throw new Error(`Request failed with status code ${statusCode}`);
  }

  const data = (await responseBody.json()) as { access_token: string };

  if (!data.access_token) {
    console.log("data", data);
    throw new Error("No access token");
  }

  return data.access_token;
};

export const getSkills = async ({
  q,
  access_token,
}: {
  q?: string;
  access_token: string;
}): Promise<LightcastSkill[]> => {
  const params: { fields: string; q?: string } = {
    fields:
      "id,name,type,description,isSoftware,isLanguage,category,subcategory,infoUrl",
  };

  if (q) params.q = q;
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `https://emsiservices.com/skills/versions/latest/skills?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  console.log("response", response);

  const { data } = (await response.json()) as { data: LightcastSkill[] };

  return data;
};

export const extractSkills = async (
  text: string,
  access_token: string
): Promise<LightcastSkill[]> => {
  const response = await fetch(
    "https://emsiservices.com/skills/versions/latest/extract",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        confidenceThreshold: 0.6,
      }),
    }
  );

  const { data } = (await response.json()) as {
    data: { skill: LightcastSkill; confidence: number }[];
  };

  return data.map(({ skill }) => skill);
};
