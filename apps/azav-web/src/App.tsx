import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Container, Stack, TextArea, Typography } from "@octocoach/ui";
import "@octocoach/ui/font.css";
import "@octocoach/ui/reset.css";
import { bg, themeClass } from "@octocoach/ui/theme.css";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import animation from "./animation.json";
import { client } from "./client";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.querySelector("html")?.classList.add(themeClass.frappe, bg);
  }, []);

  return (
    <Container element="main">
      <Stack spacing="loose">
        <Typography size="xl" element="h1">
          Ask AZAV
        </Typography>
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
    </Container>
  );
}

export default App;
