"use client";

import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { NewModuleInfo } from "@octocoach/db/schemas/org/module";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
import { getEntries } from "@octocoach/tshelpers";
import {
  Box,
  Button,
  Card,
  Form,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import Upload from "@octocoach/ui/Form/Upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ZodError } from "zod";
import { SaveModuleData, SaveModuleRetype } from "./actions";

type ModuleInfoLocale = SaveModuleData["moduleInfo"][Locales];

const EditModuleLocale = ({
  locale,
  value,
  onSetValues,
  errors,
}: {
  locale: Locales;
  value: ModuleInfoLocale;
  onSetValues: (locale: Locales, values: ModuleInfoLocale) => void;
  errors?: ZodError<ModuleInfoLocale>;
}) => {
  const store = useFormStore<ModuleInfoLocale>({
    defaultValues: value,
    setValues: (values) => {
      onSetValues(locale, values);
    },
  });

  useEffect(() => {
    if (errors?.issues?.length) {
      for (const issue of errors.issues) {
        const path = issue.path.join(".");
        store.setFieldTouched(path, true);
        store.setError(path, issue.message);
      }
    }
  }, [errors]);

  const $ = store.names;

  return (
    <Box paddingX="none" grow>
      <Card surface="mantle">
        <Form store={store}>
          <Stack>
            <Text size="l" variation="heading">
              <Message id={`languages.${locale}`} />
            </Text>
            <FormField name={$.title} label="Title">
              <FormInput name={$.title} />
            </FormField>
            <FormField name={$.description} label="Description">
              <FormInput
                name={$.description}
                render={<textarea style={{ minHeight: "10rem" }} />}
              />
            </FormField>
            <FormField name={$.imageAlt} label="Image Alt Text">
              <FormInput name={$.imageAlt} />
            </FormField>
          </Stack>
        </Form>
      </Card>
    </Box>
  );
};

export function EditModule({
  saveModule,
  orgSlug,
  module,
  moduleInfo,
  onDone,
}: {
  module: SaveModuleData["module"];
  moduleInfo: SaveModuleData["moduleInfo"];
  orgSlug: string;
  saveModule: (data: SaveModuleData) => SaveModuleRetype;
  onDone: () => void;
}) {
  const defaultValues: SaveModuleData = {
    module,
    moduleInfo,
  };

  const store = useFormStore<SaveModuleData>({
    defaultValues,
    setValues: (values) => {
      store.setValue(
        store.names.module.id,
        values.module.id
          .toLowerCase()
          .replace(/[^A-Za-z0-9-\s]+/g, "")
          .replace(/\s+|-+\s+/g, "-")
      );
    },
  });

  const $ = store.names;

  const [isPending, startTransition] = useTransition();

  const onSetLocaleValues = (locale: Locales, values: ModuleInfoLocale) => {
    store.setValues((oldValues) => ({
      ...oldValues,
      moduleInfo: { ...oldValues.moduleInfo, [locale]: values },
    }));
  };

  const router = useRouter();

  const [moduleInfoErrors, setModuleInfoErrors] = useState<
    Partial<Record<Locales, ZodError<NewModuleInfo>>>
  >({});

  const onSubmit = () => {
    startTransition(() => {
      const values = store.getState().values;
      const units = parseInt(values.module.units as any);
      saveModule({ ...values, module: { ...values.module, units } }).then(
        (result) => {
          if (result.success === true) {
            store.reset();
            onDone();
            router.refresh();
          } else if (result.errors) {
            if (result.errors.module?.issues.length) {
              for (const issue of result.errors.module.issues) {
                const path = issue.path.join(".");
                store.setFieldTouched(path, true);
                store.setError(path, issue.message);
              }
            }
            if (result.errors.moduleInfo) {
              for (const [locale, errors] of getEntries(
                result.errors.moduleInfo
              )) {
                setModuleInfoErrors((cur) => ({
                  ...cur,
                  [locale]: errors,
                }));
              }
            }
          }
        }
      );
    });
  };

  const imageSrc = store.useValue($.module.imageSrc);

  const onCancel = () => {
    startTransition(() => {
      onDone();
    });
  };

  return (
    <Card>
      <Stack>
        <Form store={store}>
          <FormField name={$.module.id} label="Slug">
            <FormInput name={$.module.id} />
          </FormField>
          <FormField name={$.module.units} label="Units">
            <FormInput name={$.module.units} type="number" />
          </FormField>
        </Form>

        <Upload
          onUploaded={(src) => store.setValue($.module.imageSrc, src)}
          orgSlug={orgSlug}
        />
        {imageSrc && (
          <Image src={imageSrc} height={100} width={100} alt="Uploaded Image" />
        )}
        <Stack direction="horizontal">
          {dbLocales.map((locale) => (
            <EditModuleLocale
              key={locale}
              locale={locale}
              value={moduleInfo[locale]}
              onSetValues={onSetLocaleValues}
              errors={moduleInfoErrors[locale]}
            />
          ))}
        </Stack>

        <Stack direction="horizontal">
          <Button onClick={onCancel} color="contrast">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}