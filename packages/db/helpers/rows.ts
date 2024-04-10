export function getFirstRow<T>(rows: T[]) {
  const firstRow = rows[0];
  if (!firstRow) throw new Error("No first row!");

  return firstRow;
}
