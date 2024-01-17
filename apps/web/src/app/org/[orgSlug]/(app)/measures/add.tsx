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
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ZodError } from "zod";
import { NewMeasureWithInfo, SaveMeasureRetype } from "./actions";

const EditMeasureLocale = ({
  locale,
  value,
  onSetValues,
  errors,
}: {
  locale: Locales;
  value: NewMeasureWithInfo;
  onSetValues: (locale: Locales, values: NewMeasureWithInfo) => void;
  errors?: ZodError<NewMeasureInfo>;
}) => {
  const store = useFormStore<NewMeasureWithInfo>({
    defaultValues: value,
    setValues: (values) => onSetValues(locale, values),
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
            <FormField name={$.image.alt} label="Alt Text">
              <FormInput name={$.image.alt} />
            </FormField>
            <FormField name={$.title} label="Title">
              <FormInput name={$.title} />
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
  saveMeasure: (data: Record<Locales, NewMeasureWithInfo>) => SaveMeasureRetype;
  orgSlug: string;
}) {
  const blank: NewMeasureWithInfo = {
    title: "",
    description: "",
    requirements: "",
    image: { src: "", alt: "" },
  };

  const defaultValues = fromEntries(dbLocales.map((locale) => [locale, blank]));

  const store = useFormStore<{ [key in Locales]: NewMeasureWithInfo }>({
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSetValues = (locale: Locales, values: NewMeasureWithInfo) => {
    store.setValues((oldValues) => ({ ...oldValues, [locale]: values }));
  };

  const router = useRouter();

  const [errors, setErrors] = useState<
    Partial<Record<Locales, ZodError<NewMeasureInfo>>>
  >({});

  const onSubmit = () => {
    const toSave = store.getState().values;

    for (const locale of dbLocales) {
      toSave[locale].image.src = image;
    }

    startTransition(() => {
      saveMeasure(toSave).then((result) => {
        if (result.success === true) {
          store.reset();
          setShow(false);
          router.refresh();
        } else if (result.errors) {
          for (const [locale, errors] of getEntries(result.errors)) {
            setErrors((cur) => ({ ...cur, [locale]: errors }));
          }
        }
      });
    });
  };

  const [image, setImage] = useState("");

  const [show, setShow] = useState(false);

  const onCancel = () => {
    setShow(false);
  };

  if (!show) {
    return <Button onClick={() => setShow(true)}>Add a Measure</Button>;
  }

  return (
    <Stack>
      <Stack spacing="tight">
        <Upload onUploaded={setImage} orgSlug={orgSlug} />
        {image && (
          <img
            src={image}
            height={200}
            width={200}
            style={{ imageRendering: "pixelated" }}
          />
        )}
      </Stack>
      <Stack direction="horizontal">
        {dbLocales.map((locale) => (
          <EditMeasureLocale
            locale={locale}
            value={blank}
            onSetValues={onSetValues}
            errors={errors[locale]}
          />
        ))}
      </Stack>
      <Stack direction="horizontal">
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isPending}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
