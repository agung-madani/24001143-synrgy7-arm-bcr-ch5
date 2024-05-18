import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "armada009",
      port: 5432,
      host: "localhost",
      database: "bcr",
    },
  },
};

module.exports = config;
