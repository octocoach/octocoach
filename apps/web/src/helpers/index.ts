export const serialize = <T extends object>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;
