import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    let hasTable = await knex.schema.hasTable("user");
    if (!hasTable) {
        await knex.schema.createTable("user", (table) => {
            table.increments();
            table.string("username");
            table.text("password");
            table.string("level");
            table.timestamps(false, true);
        });
    }
    hasTable = await knex.schema.hasTable("category");
    if (!hasTable) {
        await knex.schema.createTable("category", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }
    hasTable = await knex.schema.hasTable("file");
    if (!hasTable) {
        await knex.schema.createTable("file", (table) => {
            table.increments();
            table.string("name");
            table.text("content");
            table.integer("is_file");
            table.string("category");
            table.integer("category_id").references("category.id");
            table.string("owner");
            table.integer("user_id").references("user.id");
            table.timestamps(false, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("file");
    await knex.schema.dropTableIfExists("category");
    await knex.schema.dropTableIfExists("user");
}

