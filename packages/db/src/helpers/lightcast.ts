import got from "got";
import { ZodTypeAny, z } from "zod";

const client_id = process.env.LIGHTCAST_CLIENT_ID;
const client_secret = process.env.LIGHTCAST_SECRET;

const makeIdentifyer = <T extends ZodTypeAny>(id: T) =>
  z.object({
    id,
    name: z.string(),
  });

const skillSchema = z.object({
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

type Skill = z.infer<typeof skillSchema>;

export const getAccessToken = async (): Promise<string> => {
  const { access_token } = (await got
    .post("https://auth.emsicloud.com/connect/token", {
      form: {
        client_id,
        client_secret,
        grant_type: "client_credentials",
        scope: "emsi_open",
      },
    })
    .json()) as { access_token: string };

  return access_token;
};

export const getSkills = async ({
  q,
  access_token,
}: {
  q?: string;
  access_token: string;
}): Promise<Skill[]> => {
  const params: { fields: string; q?: string } = {
    fields:
      "id,name,type,description,isSoftware,isLanguage,category,subcategory,infoUrl",
  };

  if (q) params.q = q;
  const searchParams = new URLSearchParams(params);

  const response = (await got
    .get("https://emsiservices.com/skills/versions/latest/skills", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      searchParams,
    })
    .json()) as { data: Skill[] };

  return response.data;
};

export const extractSkills = async (
  text: string,
  access_token: string
): Promise<Skill[]> => {
  const response = (await got
    .post("https://emsiservices.com/skills/versions/latest/extract", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        confidenceThreshold: 0.6,
      }),
    })
    .json()) as { data: { skill: Skill; confidence: number }[] };

  return response.data.map(({ skill }) => skill);
};
