import Message from "@octocoach/i18n/src/react-message";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";

import { BaLogo } from "./ba-logo";

export const FundedByBA = () => (
  <Stack align="center" justify="center" wrap spacing="tight">
    <Text size="s" weight="semiBold">
      <Message id="measure.fundedBy" />
    </Text>
    <BaLogo width={200} />
  </Stack>
);
