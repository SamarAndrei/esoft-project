import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('orders', function (table) {
        table.specificType('status', 'varchar(55)').defaultTo('Не оплачен').alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('orders', function (table) {
        table.specificType('status', 'varchar(55)[]').alter();
    });
}

