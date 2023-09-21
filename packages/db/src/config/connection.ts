const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PW;
const host = "localhost";
const port = 5432;
const database = process.env.POSTGRES_DB;

export const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;
