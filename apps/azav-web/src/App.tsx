import { Button, TextArea } from "@octocoach/ui";
import { latteThemeClass } from "@octocoach/ui/latteTheme.css";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import style from "./App.module.css";
import { client } from "./client";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className={latteThemeClass}>
      <section className={style.grid}>
        <TextArea
          label="Your Question"
          value={input}
          onChange={(val) => setInput(val)}
        />
        <Button
          color="primary"
          onClick={async () => {
            const output = await client.askAZAV.query(input);
            setOutput(output);
          }}
        >
          Ask
        </Button>
        <ReactMarkdown>{output}</ReactMarkdown>
      </section>
    </div>
  );
}

export default App;
