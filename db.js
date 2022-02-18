const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbPassword = "postgres";
const database = "bandmates";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbPassword}@localhost:5432/${database}`
);