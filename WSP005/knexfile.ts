// import type { Knex as KnexType } from "knex";
// import Knex from 'knex';
// import dotenv from 'dotenv';
// dotenv.config();

import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
    debug: true,
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
      // database: "memo_wall",
      // user: "postgres",
      // password: "postgres"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.TEST_POSTGRES_HOST,
      database: process.env.TEST_POSTGRES_DB,
      user: process.env.TEST_POSTGRES_USER,
      password: process.env.TEST_POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;

// export const knex = Knex(config[process.env.NODE_ENV || "development"]);
// export const knex = Knex(config["development"]);
