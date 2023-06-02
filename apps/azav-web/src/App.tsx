import { Button, Stack, TextArea } from "@octocoach/ui";
import { latteThemeClass } from "@octocoach/ui/latteTheme.css";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { client } from "./client";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "./animation.json";
import "./font.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={latteThemeClass}>
      <Stack>
        <TextArea
          label="What would you like to know about AZAV?"
          value={input}
          onChange={(val) => setInput(val)}
        />
        <Button
          color="primary"
          isDisabled={loading}
          onClick={async () => {
            try {
              setLoading(true);
              const output = await client.askAZAV.query(input);
              setInput("");
              setOutput(output);
              setLoading(false);
            } catch (err) {
              console.error(err);
              setLoading(false);
            }
          }}
        >
          Ask
        </Button>
        {loading ? (
          <Player src={animation} loop autoplay />
        ) : (
          <ReactMarkdown>{output}</ReactMarkdown>
        )}
      </Stack>
    </div>
  );
}

export default App;
