"use client";

import { Card, Stack, Text, Box, Button } from "@octocoach/ui";
import { ModuleWithInfo } from "./page";
import { removeMeasureFromModule } from "./actions";
import { startTransition } from "react";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { useRouter } from "next/navigation";

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
      removeMeasureFromModuleWithSlug({
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
              <Button size="small" onClick={() => onRemove(mod)}>
                Remove
              </Button>
            </Box>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
