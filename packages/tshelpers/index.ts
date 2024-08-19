export type Entries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

export type Keys<T> = {
  [K in keyof T]-?: K;
}[keyof T][];

export type Values<T> = {
  [K in keyof T]-?: T[K];
}[keyof T][];

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export const getKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Keys<T>;

export const getValues = <T extends object>(obj: T) =>
  Object.values(obj) as Values<T>;

export const fromEntries = <T extends object>(entries: Entries<T>) =>
  entries.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as T);

export const exhaustiveCheck = (_: never): never => {
  throw new Error(`Yikes! This should never happen!`);
};
