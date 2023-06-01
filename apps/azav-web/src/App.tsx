import { Button, TextArea } from "@octocoach/ui";
import { latteThemeClass } from "@octocoach/ui/latteTheme.css";
import { type AppRouter } from "@octocoach/trpc";
import style from "./App.module.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

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
          onClick={() => {
            setInput("");
          }}
        >
          Ask
        </Button>
      </section>
    </div>
  );
}

export default App;
