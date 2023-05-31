import styles from "./page.module.css";
import { createAgent } from "@octocoach/embeddings";

export default function Page() {
  async function myAction(data: FormData) {
    "use server";

    const input = data.get("question") as string;

    console.log(`Asking: ${input}`);

    const agent = await createAgent({
      indexPath: "../../packages/embeddings/vectors/ba-metasearch-index",
    });

    const response = await agent.call({ input });

    console.log(response);
    return response.output;
  }

  return (
    <main>
      <form action={myAction} className={styles.grid}>
        <textarea name="question" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
