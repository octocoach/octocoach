const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const database = process.env.POSTGRES_DATABASE;
const port = 5433;
const ssl = process.env.NODE_ENV === "production" ? "true" : "false";

export const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;
