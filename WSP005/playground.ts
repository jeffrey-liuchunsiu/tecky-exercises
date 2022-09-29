import Knex from 'knex';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

async function main() {
    const result = await knex
        .select("*")
        .from("users");
    console.log(result);
}

main()

