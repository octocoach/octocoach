import { Button } from "@octocoach/ui";
import { latteThemeClass } from "@octocoach/ui/latteTheme.css";
import style from "./App.module.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className={latteThemeClass}>
      <section className={style.grid}>
        <textarea
          cols={30}
          rows={10}
          className={style.noResize}
          value={input}
          onChange={({ target }) => setInput(target.value)}
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
