import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('roles', function (table) {
        table.increments('id').primary();
        table.string('name', 55).notNullable();
    })
    .createTable('users', function (table) {
        table.increments('id').primary();
        table.integer('role_id').notNullable().unsigned();
        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
        table.string('name', 255).notNullable();
        table.text('email').unique().notNullable();
        table.string('password', 255).notNullable();
        table.timestamp('registration_date').defaultTo(knex.fn.now());
    })
    .createTable('production', function(table) {
        table.increments('id').primary();
        table.string('brand', 55).notNullable();
        table.specificType('size', 'varchar(55)[]');
        table.string('type', 55).notNullable();
        table.text('description').notNullable();
        table.specificType('img', 'text[]').notNullable();
        table.integer('price').notNullable();
        table.integer('stock_quantity').defaultTo(0);
    })
    .createTable('comments', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().unsigned();
        table.integer('prod_id').notNullable().unsigned();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('prod_id').references('id').inTable('production').onDelete('CASCADE');
        table.text('comment').notNullable();
        table.float('rating').notNullable().checkBetween([0, 5]);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .createTable('cart_items', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('prod_id').notNullable().unsigned().references('id').inTable('production').onDelete('CASCADE');
        table.integer('quantity').defaultTo(0)
        table.timestamp('createdAt').defaultTo(knex.fn.now());;
        table.unique(['id', 'user_id', 'prod_id']);

    })
    .createTable('favourites', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('prod_id').notNullable().unsigned().references('id').inTable('production').onDelete('CASCADE');
        table.integer('quantity').defaultTo(0);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.unique(['id', 'user_id', 'prod_id']);
    })
    .createTable('orders', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.unique(['id', 'user_id']);
    })
    .createTable('order_items', function(table) {
        table.increments('id').primary();
        table.integer('order_id').notNullable().unsigned().references('id').inTable('orders').onDelete('CASCADE');
        table.integer('prod_id').notNullable().unsigned().references('id').inTable('production').onDelete('CASCADE');
        table.integer('quantity').notNullable().defaultTo(1);
        table.unique(['id', 'order_id', 'prod_id']);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
    .dropTableIfExists('production')
    .dropTableIfExists('comments')
    .dropTableIfExists('carts')
    .dropTableIfExists('favourites')
    .dropTableIfExists('orders')
    .dropTableIfExists('order_items');
}

