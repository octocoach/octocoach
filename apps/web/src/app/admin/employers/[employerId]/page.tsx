import Logo from "@components/logo";
import { eq } from "@octocoach/db/operators";
import { db } from "@octocoach/db/connection";
import { employerTable } from "@octocoach/db/schemas/common/employer";
import Message from "@octocoach/i18n/src/react-message";
import {
  Button,
  Form,
  FormField,
  HiddenInput,
  Stack,
  Text,
} from "@octocoach/ui";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { employerId: number };
}) {
  const employer = await db.query.employerTable.findFirst({
    where: (employers, { eq }) => eq(employers.id, params.employerId),
    with: {
      jobs: true,
    },
  });

  async function changeUrl({
    url,
    employerId,
  }: {
    url: string;
    employerId: number;
  }) {
    "use server";

    if (!url) throw Error("Missing URL");
    if (!employerId) throw Error("Missing Employer ID");

    await db
      .update(employerTable)
      .set({ url })
      .where(eq(employerTable.id, employerId));

    revalidatePath("/admin/employers/[employerId]");
  }

  return (
    <Stack>
      <Link href="/admin/employers">
        <Text size="m">
          <Message id="EMPLOYERS" />
        </Text>
      </Link>
      <Logo company={employer} size={100} />
      <Form
        formStoreProps={{
          defaultValues: { url: employer.url || "", employerId: employer.id },
        }}
        onSubmit={changeUrl}
      >
        <FormField name="url" label="URL" inputType="FormInput" />
        <HiddenInput name="employerId" />
        <Button type="submit">Submit</Button>
      </Form>
      <Text size="xl">{employer.name}</Text>
      <Text>{employer.url}</Text>
      <Stack>
        {employer.jobs.map((job) => (
          <Link href={`/admin/jobs/${job.id}`} key={job.id}>
            <Text>{job.title}</Text>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}