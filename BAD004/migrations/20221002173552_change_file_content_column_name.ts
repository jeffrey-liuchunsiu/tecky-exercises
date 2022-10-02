import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("file")) {
        await knex.schema.alterTable("file", (table) => {
            table.renameColumn("content", "Content");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("file")) {
        await knex.schema.alterTable("file", (table) => {
            table.renameColumn("Content", "content");
        });
    }
}

