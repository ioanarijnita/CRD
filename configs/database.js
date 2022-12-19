const { Client } = require("pg");

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.DB_URL,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT

}); //Configuring PostgresSQL Database

module.exports = client;