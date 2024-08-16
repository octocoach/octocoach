"use client";

import { Cohort, NewCohort } from "@octocoach/db/schemas/org/cohort";
import { Measure } from "@octocoach/db/schemas/org/measure";
import {
  Button,
  Card,
  Form,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { startTransition } from "react";

const CreateCohort = ({
  measureId,
  createAction,
}: {
  measureId: Measure["id"];
  createAction: (cohort: NewCohort) => Promise<void>;
}) => {
  const store = useFormStore({
    defaultValues: {
      startDate: "",
      measure: measureId,
    },
  });

  const $ = store.names;

  const onSubmit = () => {
    const { values } = store.getState();
    const newValues = { ...values, startDate: new Date(values.startDate) };
    console.log(newValues);
    startTransition(() => {
      void createAction(newValues);
    });
  };

  return (
    <Form store={store}>
      <Stack>
        <FormField name={$.startDate} label="Start Date">
          <FormInput name={$.startDate} type="date" />
        </FormField>
        <Button onClick={onSubmit}>Create</Button>
      </Stack>
    </Form>
  );
};

export const CohortsComponent = ({
  cohorts,
  measureId,
  createAction,
  deleteAction,
}: {
  cohorts: Cohort[];
  measureId: Measure["id"];
  createAction: (cohort: NewCohort) => Promise<void>;
  deleteAction: (id: Cohort["id"]) => Promise<void>;
}) => {
  return (
    <div>
      <Text size="l">Cohorts</Text>
      <Stack spacing="tight">
        {cohorts.map((cohort) => (
          <Card key={cohort.id}>
            <Stack>
              <Text>{cohort.startDate.toLocaleDateString()}</Text>
              <Button
                onClick={() => {
                  startTransition(() => {
                    void deleteAction(cohort.id);
                  });
                }}
              >
                Delete
              </Button>
            </Stack>
          </Card>
        ))}
      </Stack>

      <CreateCohort measureId={measureId} createAction={createAction} />
    </div>
  );
};
