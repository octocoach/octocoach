import "server-only";

import { nanoid } from "nanoid";
import { headers } from "next/headers";

import { sha256 } from ".";

const accessToken = process.env.FACEBOOK_CONVERSION_TOKEN;
const pixelId = process.env.FACEBOOK_PIXEL_ID;

const metaBaseUrl = `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`;

const formatClickId = (fbclid: string) => `fb.1.${Date.now()}.${fbclid}`;

export type ConversionEvent =
  | "ViewContent"
  | "CompleteRegistration"
  | "SubmitApplication";

export type FacebookConversionUser = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
};

export type FacebookConversionUserData = Partial<{
  fbc: string;
  client_user_agent: string;
  em: string;
  fn: string;
  ln: string;
  ct: string;
}>;

export type FacebookConversionEvent = {
  action_source: "website";
  event_id: string;
  event_name: ConversionEvent;
  event_time: number;
  user_data: FacebookConversionUserData;
};

type FacebookConversionBody = {
  data: FacebookConversionEvent[];
  test_event_code?: string;
};

export const sendFacebookConversionEvent = async ({
  eventName,
  fbclid,
  user,
  testEventCode,
}: {
  eventName: ConversionEvent;
  user?: FacebookConversionUser;
  fbclid?: string;
  testEventCode?: string;
}) => {
  if (!accessToken || !pixelId) {
    console.log("No Facebook conversion token or pixel ID found");
    return;
  }

  const event_id = nanoid();

  const headersList = headers();

  const clientUserAgent = headersList.get("user-agent");

  const user_data: FacebookConversionUserData = {};

  if (fbclid) {
    user_data.fbc = formatClickId(fbclid);
  }
  if (clientUserAgent) {
    user_data.client_user_agent = clientUserAgent;
  }
  if (user) {
    user_data.em = await sha256(user.email);
    if (user.firstName) user_data.fn = await sha256(user.firstName);
    if (user.lastName) user_data.ln = await sha256(user.lastName);
    if (user.city) user_data.ct = await sha256(user.city);
  }

  const event: FacebookConversionEvent = {
    action_source: "website",
    event_id,
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    user_data,
  };

  const body: FacebookConversionBody = {
    data: [event],
  };

  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  const res = await fetch(metaBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Failed to send conversion event", await res.json());
  }
};
