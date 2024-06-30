import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('production', function(table) {
        table.specificType('gender', 'varchar(55)');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('production', function(table) {
        table.dropColumn('gender');
    });
}

