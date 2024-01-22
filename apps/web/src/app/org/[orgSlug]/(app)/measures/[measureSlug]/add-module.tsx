"use client";

import { Module, ModuleInfo } from "@octocoach/db/schemas/org/module";
import { Button, Card, Stack, Text } from "@octocoach/ui";
import { addMeasureToModule } from "./actions";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

type ModuleWithInfo = Omit<Module & ModuleInfo, "locale">;

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
            <Button
              size="small"
              onClick={() =>
                startTransition(() => {
                  addMeasureToModuleWithSlug({
                    measureId,
                    moduleId: mod.id,
                  }).then((res): void => {
                    if (res.success) {
                      router.refresh();
                    } else {
                      console.log(res);
                    }
                  });
                })
              }
            >
              Add
            </Button>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};
