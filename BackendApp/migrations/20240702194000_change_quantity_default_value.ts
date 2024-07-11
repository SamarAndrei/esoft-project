import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('cart_items', function (table) {
        table.integer('quantity').defaultTo(1).alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('cart_items', function (table) {
        table.integer('quantity').defaultTo(0).alter();
    });
}

