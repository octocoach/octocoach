"use client";

import {
  Button,
  Container,
  Form,
  FormField,
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

  const onChange = (values) => {
    if (store.getValue("name") !== name) {
      store.setValue("slug", sluggify(values.name));
      setName(store.getValue("name"));
    }
  };

  const store = useFormStore({
    defaultValues: { name: "", slug: "" },
    setValues: onChange,
  });

  return (
    <Container element="section">
      <Text size="l" variation="casual">
        Create an Organization
      </Text>
      <Form onSubmit={create} store={store}>
        <FormField name="name" label="Name" inputType="FormInput" />
        <FormField
          name="slug"
          label="Slug"
          inputType="FormInput"
          pattern="^[a-z0-9\-]+$"
        />
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}
