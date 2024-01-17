export type Entries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export const fromEntries = <T extends object>(entries: Entries<T>) =>
  entries.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as T);
