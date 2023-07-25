import { ZodSchema } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object";

export const createFunctionFromZodSchema = ({
  name,
  description,
  attrName,
  zodSchema,
}: {
  name: string;
  description: string;
  attrName: string;
  zodSchema: ZodSchema;
}) => {
  const { type, properties, required } = zodToJsonSchema(
    zodSchema
  ) as JsonSchema7ObjectType;

  return {
    name,
    description,
    parameters: {
      type: "object",
      properties: {
        [attrName]: {
          type: "array",
          items: {
            type,
            properties,
            required,
          },
        },
      },
      required: [attrName],
    },
  };
};
