"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Button, toast } from "@octocoach/ui";
import { Cookie } from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";

export const CookieBanner = ({
  acceptCookiesAction,
}: {
  acceptCookiesAction: () => Promise<void>;
}) => {
  const { LL } = useI18nContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const message = LL.cookieMessage() as string;

  const shown = useRef(false);
  const [toastId, setToastId] = useState<string | number>();

  useEffect(() => {
    if (!shown.current) {
      const newToastId = toast.info(message, {
        position: "bottom-left",
        duration: Infinity,
        icon: <Cookie />,
        action: (
          <Button
            onClick={() => {
              toast.dismiss(toastId);
              startTransition(async () => {
                await acceptCookiesAction();
              });
            }}
            size="small"
          >
            OK
          </Button>
        ),
      });

      setToastId(newToastId);

      shown.current = true;
    }
  }, [acceptCookiesAction, message, toastId]);
  return null;
};
