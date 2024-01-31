"use client";

import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { NewMeasureInfo } from "@octocoach/db/schemas/org/measure";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
import { fromEntries, getEntries } from "@octocoach/tshelpers";
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
import { SaveMeasureData, SaveMeasureRetype } from "./actions";

type MeasureInfoLocale = SaveMeasureData["measureInfo"][Locales];

const EditMeasureLocale = ({
  locale,
  value,
  onSetValues,
  errors,
}: {
  locale: Locales;
  value: MeasureInfoLocale;
  onSetValues: (locale: Locales, values: MeasureInfoLocale) => void;
  errors?: ZodError<MeasureInfoLocale>;
}) => {
  const store = useFormStore<MeasureInfoLocale>({
    defaultValues: value,
    setValues: (values) => {
      values.slug = values.slug
        .toLowerCase()
        .replace(/[^A-Za-z0-9-\s]+/g, "")
        .replace(/\s+|-+\s+/g, "-");

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
      <Card>
        <Form store={store}>
          <Stack>
            <Text size="l" variation="heading">
              <Message id={`languages.${locale}`} />
            </Text>
            <FormField name={$.imageAlt} label="Alt Text">
              <FormInput name={$.imageAlt} />
            </FormField>
            <FormField name={$.title} label="Title">
              <FormInput name={$.title} />
            </FormField>
            <FormField name={$.slug} label="Slug">
              <FormInput name={$.slug} />
            </FormField>
            <FormField name={$.description} label="Description">
              <FormInput
                name={$.description}
                render={<textarea style={{ height: "10rem" }} />}
              />
            </FormField>
            <FormField name={$.requirements} label="Requirements">
              <FormInput
                name={$.requirements}
                render={<textarea style={{ height: "10rem" }} />}
              />
            </FormField>
          </Stack>
        </Form>
      </Card>
    </Box>
  );
};

export function AddMeasure({
  saveMeasure,
  orgSlug,
}: {
  saveMeasure: (data: SaveMeasureData) => SaveMeasureRetype;
  orgSlug: string;
}) {
  const blankMeasure: SaveMeasureData["measure"] = {
    imageSrc: "",
  };

  const blankMeasureInfo: MeasureInfoLocale = {
    title: "",
    description: "",
    requirements: "",
    imageAlt: "",
    slug: "",
  };

  const defaultValuesMeasureInfo = fromEntries(
    dbLocales.map((locale) => [locale, blankMeasureInfo])
  );

  const stores = {
    measure: useFormStore<SaveMeasureData["measure"]>({
      defaultValues: blankMeasure,
    }),
    measureInfo: useFormStore<SaveMeasureData["measureInfo"]>({
      defaultValues: defaultValuesMeasureInfo,
    }),
  };

  const [isPending, startTransition] = useTransition();

  const onSetLocaleValues = (locale: Locales, values: MeasureInfoLocale) => {
    stores.measureInfo.setValues((oldValues) => ({
      ...oldValues,
      [locale]: values,
    }));
  };

  const router = useRouter();

  const [measureInfoErrors, setMeasureInfoErrors] = useState<
    Partial<Record<Locales, ZodError<NewMeasureInfo>>>
  >({});

  const onSubmit = () => {
    const measure = stores.measure.getState().values;
    const measureInfo = stores.measureInfo.getState().values;

    startTransition(() => {
      saveMeasure({ measure, measureInfo }).then((result) => {
        if (result.success === true) {
          stores.measure.reset();
          stores.measureInfo.reset();
          setShow(false);
          router.refresh();
        } else if (result.errors) {
          if (result.errors.measure?.issues?.length) {
            for (const issue of result.errors.measure.issues) {
              const path = issue.path.join(".");
              stores.measure.setFieldTouched(path, true);
              stores.measure.setError(path, issue.message);
            }
          }
          if (result.errors.measureInfo) {
            for (const [locale, errors] of getEntries(
              result.errors.measureInfo
            )) {
              setMeasureInfoErrors((cur) => ({ ...cur, [locale]: errors }));
            }
          }
        }
      });
    });
  };

  const $ = stores.measure.names;
  const [show, setShow] = useState(false);
  const imageSrc = stores.measure.useValue($.imageSrc);

  const onCancel = () => {
    setShow(false);
  };

  if (!show) {
    return <Button onClick={() => setShow(true)}>Add a Measure</Button>;
  }

  return (
    <Stack>
      <Stack spacing="tight">
        <Upload
          onUploaded={(src) => stores.measure.setValue($.imageSrc, src)}
          orgSlug={orgSlug}
        />
        {imageSrc && (
          <Image
            src={imageSrc}
            height={200}
            width={200}
            style={{ imageRendering: "pixelated" }}
            alt="Uploaded Image"
          />
        )}
      </Stack>
      <Stack direction="horizontal">
        {dbLocales.map((locale) => (
          <EditMeasureLocale
            key={locale}
            locale={locale}
            value={blankMeasureInfo}
            onSetValues={onSetLocaleValues}
            errors={measureInfoErrors[locale]}
          />
        ))}
      </Stack>
      <Stack direction="horizontal">
        <Button onClick={onCancel} fill="body">
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isPending}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
