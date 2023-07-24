import { Logo } from "@app/admin/components";
import { eq } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { companies } from "@octocoach/db/src/schema/companies";
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
  params: { companyId: number };
}) {
  const company = await db.query.companies.findFirst({
    where: (companies, { eq }) => eq(companies.id, params.companyId),
    with: {
      jobs: true,
    },
  });

  async function changeUrl({
    url,
    companyId,
  }: {
    url: string;
    companyId: number;
  }) {
    "use server";

    if (!url) throw Error("Missing URL");
    if (!companyId) throw Error("Missing Company ID");

    await db.update(companies).set({ url }).where(eq(companies.id, companyId));

    revalidatePath("/admin/companies/[companyId]");
  }

  return (
    <Stack>
      <Link href="/admin/companies">
        <Text size="m">
          <Message id="COMPANIES" />
        </Text>
      </Link>
      <Logo company={company} size={100} />
      <Form
        formStoreProps={{
          defaultValues: { url: company.url || "", companyId: company.id },
        }}
        onSubmit={changeUrl}
      >
        <FormField name="url" label="URL" inputType="FormInput" />
        <HiddenInput name="companyId" />
        <Button type="submit">Submit</Button>
      </Form>
      <Text size="xl">{company.name}</Text>
      <Text>{company.url}</Text>
      <Stack>
        {company.jobs.map((job) => (
          <Link href={`/admin/jobs/${job.id}`} key={job.id}>
            <Text>{job.title}</Text>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
