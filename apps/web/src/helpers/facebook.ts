import "server-only";

import { nanoid } from "nanoid";
import { headers } from "next/headers";

const accessToken = process.env.FACEBOOK_CONVERSION_TOKEN;
const pixelId = process.env.FACEBOOK_PIXEL_ID;

const metaBaseUrl = `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`;

const formatClickId = (fbclid: string) => `fb.1.${Date.now()}.${fbclid}`;

export type ConversionEvent = "ViewContent";

export type FacebookConversionEvent = {
  action_source: "website";
  event_id: string;
  event_name: ConversionEvent;
  event_time: number;
  user_data: {
    client_user_agent?: string;
    fbc: string;
  };
};

type FacebookConversionBody = {
  data: FacebookConversionEvent[];
  test_event_code?: string;
};

export const sendFacebookConversionEvent = async ({
  fbclid,
  eventName,
  testEventCode,
}: {
  fbclid: string;
  eventName: ConversionEvent;
  testEventCode?: string;
}) => {
  if (!accessToken || !pixelId) {
    console.log("No Facebook conversion token or pixel ID found");
    return;
  }
  const event_id = nanoid();

  const headersList = headers();

  const clientUserAgent = headersList.get("user-agent");
  const fbc = formatClickId(fbclid);

  const event: FacebookConversionEvent = {
    action_source: "website",
    event_id,
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      fbc,
    },
  };

  if (clientUserAgent) {
    event.user_data.client_user_agent = clientUserAgent;
  }

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
