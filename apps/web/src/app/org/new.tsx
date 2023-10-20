"use client";

import { legalForm } from "@octocoach/db/schemas/common/legal-form";
import {
  Address,
  Button,
  Container,
  Form,
  FormField,
  FormInput,
  FormSelect,
  SelectItem,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { useState } from "react";
import { CreateOrganization, create } from "./actions";

export const NewOrganization = () => {
  const sluggify = (input: string): string =>
    input
      .replace(/[\-_\+]/g, " ")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ")
      .reduce(
        (acc, curr) => `${acc}${curr.charAt(0).toUpperCase()}${curr.slice(1)}`,
        ""
      )
      .split(/(?=[A-Z])/)
      .reduce(
        (acc, curr) =>
          `${acc}${curr.charAt(0).toLowerCase()}${
            curr.length > 1 ? curr.length - 1 : ""
          }`,
        ""
      );

  const [name, setName] = useState("");
  const [legalFormAbbreviation, setLegalFormAbbreviation] = useState("");
  const [isSlugModified, setIsSlugModified] = useState(false);

  const onChange = (values) => {
    const abbreviation = legalForm[values.legalForm]?.abbreviation;
    const fullName = legalForm[values.legalForm]?.fullName;
    if (!isSlugModified && store.getValue("displayName") !== name) {
      store.setValue("slug", sluggify(values.displayName));
      setName(store.getValue("displayName"));
    }
    setLegalFormAbbreviation(abbreviation);
  };

  const store = useFormStore<CreateOrganization>({
    defaultValues: {
      displayName: "",
      slug: "",
      legalName: "",
      legalForm: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
      state: "",
      country: "de",
    },
    setValues: onChange,
  });

  return (
    <Container element="section">
      <Form onSubmit={create} store={store}>
        <Stack spacing="loose">
          <Stack>
            <Stack direction="horizontal">
              <FormField name="displayName" label="Display Name" grow>
                <FormInput name="displayName" />
              </FormField>
              <FormField name="slug" label="Slug">
                <FormInput
                  name="slug"
                  onChange={() => setIsSlugModified(true)}
                />
              </FormField>
            </Stack>
            <Stack direction="horizontal">
              <FormField name="legalName" label="Legal name" grow>
                <FormInput name="legalName" />
              </FormField>
              <FormField name={"legalForm"} label="Legal Form">
                <FormSelect
                  name={"legalForm"}
                  displayValue={legalFormAbbreviation}
                >
                  {Object.entries(legalForm).map(
                    ([value, { fullName }], key) => (
                      <SelectItem key={key} value={value}>
                        <Text>{fullName}</Text>
                      </SelectItem>
                    )
                  )}
                </FormSelect>
              </FormField>
            </Stack>
          </Stack>

          <Address store={store} />

          <Button type="submit">Create</Button>
        </Stack>
      </Form>
    </Container>
  );
};
