import Link from "@app/link";
import { db } from "@octocoach/db/src/connection";
import { jobSchema, jobs } from "@octocoach/db/src/schema/jobs";
import { Card, Container, Stack, Typography } from "@octocoach/ui";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default async function Page({ params }: { params: { jobId: number } }) {
  const job = await db.query.jobs.findFirst({
    where: (jobs, { eq }) => eq(jobs.id, params.jobId),
    with: {
      company: true,
      tasks: {
        with: {
          tasksToSkills: {
            with: {
              skill: true,
            },
          },
        },
      },
    },
  });

  return (
    <Stack>
      <div>
        <Typography size="l">{job.title}</Typography>
        <Typography>{job.company.name}</Typography>
      </div>
      <ReactMarkdown>{job.description}</ReactMarkdown>

      <Stack>
        {job.tasks.map((task) => (
          <Link href={`/admin/tasks/${task.id}`}>
            <Card>
              <Typography>{task.description}</Typography>
              {task.tasksToSkills.map(({ skill }) => (
                <Typography size="s" element="span">
                  {skill.name},{" "}
                </Typography>
              ))}
            </Card>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
