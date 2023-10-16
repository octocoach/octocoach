export function toTuple<T extends string>(array: T[]): [T, ...T[]] {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }
  return [array[0], ...array.slice(1)] as [T, ...T[]];
}
