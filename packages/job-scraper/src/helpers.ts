import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { ZodSchema } from "zod";

export function zodParseJSON<T>(schema: ZodSchema<T>) {
  return (input: string): T => schema.parse(JSON.parse(input));
}

export function makeToolChoice<T extends string | object>(
  tool: RunnableToolFunction<T>
) {
  if (!tool.function?.name) throw new Error("tool.function.name is undefined");

  return {
    type: tool.type,
    function: { name: tool.function.name },
  };
}
