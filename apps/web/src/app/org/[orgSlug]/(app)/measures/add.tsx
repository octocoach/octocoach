"use client";

import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
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
import { NewMeasureWithInfo, SaveMeasureRetype } from "./actions";
import { ZodError } from "zod";
import { NewMeasureInfo } from "@octocoach/db/schemas/org/measure";

const EditMeasureLocale = ({
  locale,
  value,
  onSetValues,
  errors,
}: {
  locale: Locales;
  value: NewMeasureWithInfo;
  onSetValues: (locale: Locales, values: NewMeasureWithInfo) => void;
  errors: ZodError<NewMeasureInfo>;
}) => {
  const store = useFormStore<NewMeasureWithInfo>({
    defaultValues: value,
    defaultTouched: {
      title: true,
      description: true,
      requirements: true,
    },
    setValues: (values) => onSetValues(locale, values),
  });

  useEffect(() => {
    if (errors?.issues?.length) {
      errors.issues.forEach((issue) => {
        store.setError(issue.path.join("."), issue.message);
      });
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
  const store = useFormStore<{ [key in Locales]: NewMeasureWithInfo }>({
    defaultValues: {
      en: blank,
      de: blank,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSetValues = (locale: Locales, values: NewMeasureWithInfo) => {
    store.setValues((oldValues) => ({ ...oldValues, [locale]: values }));
  };

  const router = useRouter();

  const [enErrors, setEnErrors] = useState<ZodError<NewMeasureInfo>>();
  const [deErrors, setDeErrors] = useState<ZodError<NewMeasureInfo>>();

  const onSubmit = () => {
    const toSave = store.getState().values;

    toSave.en.image.src = image;
    toSave.de.image.src = image;

    startTransition(() => {
      saveMeasure(toSave).then((result) => {
        if (result.success === true) {
          store.reset();
          setShow(false);
          router.refresh();
        } else {
          console.log(result.errors);
          for (const [locale, errors] of Object.entries(result.errors)) {
            if (locale === "en") {
              setEnErrors(errors);
            }
            if (locale === "de") {
              setDeErrors(errors);
            }
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
        <EditMeasureLocale
          locale="en"
          value={blank}
          onSetValues={onSetValues}
          errors={enErrors}
        />
        <EditMeasureLocale
          locale="de"
          value={blank}
          onSetValues={onSetValues}
          errors={deErrors}
        />
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
