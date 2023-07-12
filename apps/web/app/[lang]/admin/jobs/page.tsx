import { db } from "@octocoach/db/src/connection";
import { Container, Stack, Typography } from "@octocoach/ui";
import ReactMarkdown from "react-markdown";

export default async function Page() {
  const jobs = await db.query.jobs.findMany({
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
    <Container element="section">
      <Typography size="l">Jobs</Typography>
      <Stack>
        {jobs.map((job) => (
          <div key={job.id}>
            <Typography>{job.title}</Typography>
            <Container element="div">
              <Stack>
                <Typography>{job.company.name}</Typography>
                <Typography>{job.description}</Typography>
                <Container element="div">
                  <Stack>
                    {job.tasks.map((task) => (
                      <Container element="div">
                        <ReactMarkdown>{task.description}</ReactMarkdown>

                        <Stack>
                          {task.tasksToSkills.map(({ skill }) => (
                            <Typography size="s">{skill.name}</Typography>
                          ))}
                        </Stack>
                      </Container>
                    ))}
                  </Stack>
                </Container>
              </Stack>
            </Container>
          </div>
        ))}
      </Stack>
    </Container>
  );
}
