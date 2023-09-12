import { Button, Container, Form, FormField, Text } from "@octocoach/ui";
import { create } from "./actions";

export default function Page() {
  return (
    <Container element="section">
      <Text size="l" variation="casual">
        Create an Organization
      </Text>
      <Form
        formStoreProps={{ defaultValues: { name: "", slug: "" } }}
        onSubmit={create}
      >
        <FormField name="name" label="Name" inputType="FormInput" />
        <FormField name="slug" label="Slug" inputType="FormInput" />
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}
