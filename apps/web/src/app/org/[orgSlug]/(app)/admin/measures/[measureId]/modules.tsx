"use client";

import { Measure } from "@octocoach/db/schemas/org/measure";
import { ModuleWithInfo } from "@octocoach/db/schemas/org/module";
import { Box, Button, Card, Stack, Text } from "@octocoach/ui";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

import { removeMeasureFromModule } from "./actions";

export const ModulesCompoent = ({
  measureId,
  modules,
  orgSlug,
}: {
  measureId: Measure["id"];
  modules: ModuleWithInfo[];
  orgSlug: string;
}) => {
  const removeMeasureFromModuleWithSlug = removeMeasureFromModule.bind(
    "orgSlug",
    orgSlug
  );

  const router = useRouter();

  const onRemove = (mod: ModuleWithInfo) => {
    startTransition(() => {
      void removeMeasureFromModuleWithSlug({
        measureId,
        moduleId: mod.id,
      }).then((res): void => {
        if (res.success) {
          router.refresh();
        } else {
          console.log(res);
        }
      });
    });
  };

  return (
    <Stack>
      {modules.map((mod) => (
        <Card key={mod.id}>
          <Stack direction="horizontal" justify="between">
            <Box>
              <Text size="l">{mod.title}</Text>
              <Text>{mod.description}</Text>
            </Box>
            <Box>
              <Button
                size="small"
                onClick={() => onRemove(mod)}
                color="warning"
              >
                Remove
              </Button>
            </Box>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
