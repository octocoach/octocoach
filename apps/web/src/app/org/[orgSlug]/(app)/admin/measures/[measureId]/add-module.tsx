"use client";

import { Measure } from "@octocoach/db/schemas/org/measure";
import { ModuleWithInfo } from "@octocoach/db/schemas/org/module";
import { Button, Card, Stack, Text } from "@octocoach/ui";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { addMeasureToModule } from "./actions";

export const AddModuleToMeasure = ({
  measureId,
  modules,
  orgSlug,
}: {
  measureId: Measure["id"];
  modules: ModuleWithInfo[];
  orgSlug: string;
}) => {
  const router = useRouter();

  const addMeasureToModuleWithSlug = addMeasureToModule.bind(
    "orgSlug",
    orgSlug
  );

  const onAdd = (mod: ModuleWithInfo) =>
    startTransition(() => {
      void addMeasureToModuleWithSlug({
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

  return (
    <Card>
      <Text>Add Module</Text>
      <Stack>
        {modules.map((mod) => (
          <Stack
            direction="horizontal"
            key={mod.id}
            justify="between"
            align="center"
          >
            <Text>{mod.title}</Text>
            <Button size="small" onClick={() => onAdd(mod)}>
              Add
            </Button>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};
