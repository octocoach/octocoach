"use client";

import { legalForm } from "@octocoach/db/schemas/common/legal-form";
import {
  Button,
  Container,
  Form,
  FormField,
  FormInput,
  FormSelect,
  SelectItem,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { useState } from "react";
import { create } from "./actions";

export default function Page() {
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
  const [legalFormFullName, setLegalFormFullName] = useState("");

  const onChange = (values) => {
    const abbreviation = legalForm[values.legalForm]?.abbreviation;
    const fullName = legalForm[values.legalForm]?.fullName;
    if (store.getValue("displayName") !== name) {
      store.setValue("slug", sluggify(values.displayName));
      setName(store.getValue("displayName"));
    }
    setLegalFormAbbreviation(abbreviation);
    setLegalFormFullName(fullName);
  };

  const store = useFormStore({
    defaultValues: { displayName: "", slug: "", legalName: "", legalForm: "" },
    setValues: onChange,
  });

  return (
    <Container element="section">
      <Text size="l" variation="casual">
        Create an Organization
      </Text>
      <Form onSubmit={create} store={store}>
        <FormField name="displayName" label="Display Name">
          <FormInput name="displayName" />
        </FormField>
        <FormField name="slug" label="Slug">
          <FormInput name="slug" />
        </FormField>
        <FormField name="legalName" label="Legal name">
          <FormInput name="legalName" suffix={legalFormAbbreviation} />
        </FormField>
        <FormField name={"legalForm"} label="Legal Form">
          <FormSelect name={"legalForm"} displayValue={legalFormFullName}>
            {Object.entries(legalForm).map(([value, { fullName }], key) => (
              <SelectItem key={key} value={value}>
                <Text>{fullName}</Text>
              </SelectItem>
            ))}
          </FormSelect>
        </FormField>
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}
