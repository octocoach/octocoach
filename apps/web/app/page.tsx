import { Button, Textarea } from "ui";

export default function Page() {
  return (
    <main className="container mx-auto px-4 xl:m-1">
      <div className="grid gap-2">
        <Textarea />
        <Button>Ask</Button>
      </div>
    </main>
  );
}
