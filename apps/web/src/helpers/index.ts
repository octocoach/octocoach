export const serialize = <T extends object>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;

export const safeParseInt = (value: string | number) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseInt(value);

  throw new Error("Invalid value");
};
