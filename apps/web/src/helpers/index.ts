export const serialize = <T extends object>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;

export const safeParseInt = (value: string | number) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseInt(value);

  throw new Error("Invalid value");
};

export const sha256 = (data: string) => {
  const buffer = new TextEncoder().encode(data);
  return crypto.subtle.digest("SHA-256", buffer).then((hash) => {
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
};
