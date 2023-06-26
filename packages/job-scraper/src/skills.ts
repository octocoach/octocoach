import got from "got";
import { Skill } from "./schema";

const client_id = process.env.LIGHTCAST_CLIENT_ID;
const client_secret = process.env.LIGHTCAST_SECRET;

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

export const getSkills = async (q: string, access_token: string) => {
  const searchParams = new URLSearchParams({
    q,
    fields: "id,name,type,tags,isSoftware,isLanguage,category,subcategory",
  });

  const response = (await got
    .get("https://emsiservices.com/skills/versions/latest/skills", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      searchParams,
    })
    .json()) as { data: any[] };

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

  return response.data.map(({ skill }) => ({ id: skill.id, name: skill.name }));
};
