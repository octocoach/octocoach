import { Button, Textarea, ChatMessage } from "ui";

export default function Page() {
  return (
    <main className="container mx-auto px-8">
      <div className="grid justify-center gap-2">
        <Textarea />
        <Button>Ask</Button>
        <div>
          <ChatMessage
            name="Adriaan"
            text="Hey, how are you?"
            time={new Date()}
            side="start"
          />
          <ChatMessage
            name="Burger"
            text="I'm good thanks and you?"
            time={new Date()}
            side="end"
          />
        </div>
      </div>
    </main>
  );
}
