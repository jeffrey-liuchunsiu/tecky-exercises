import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("memos")) {
        await knex.schema.alterTable("memos", (table) => {
            table.text('content').alter()
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("memos")) {
        await knex.schema.alterTable("memos", (table) => {
            table.string('content').alter()
        });
    }
}

