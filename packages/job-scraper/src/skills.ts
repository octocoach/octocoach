import got from "got";

const client_id = process.env.LIGHTCAST_CLIENT_ID;
const client_secret = process.env.LIGHTCAST_SECRET;

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

const searchParams = new URLSearchParams({ q: "PHP" });

const response = (await got
  .get("https://emsiservices.com/skills/versions/latest/skills", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    searchParams,
  })
  .json()) as { data: any[] };

console.log(response.data);
