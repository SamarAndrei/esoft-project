import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable('users', function (table) {
            table.index(['email'], 'users_email_index', {
                storageEngineIndexType: 'btree',
                predicate: knex.whereNotNull('email'),
            });
        })
        .alterTable('comments', function (table) {
            table.index(
                ['user_id', 'prod_id'],
                'comments_user_id_prod_id_index',
                {
                    storageEngineIndexType: 'btree',
                    predicate: knex
                        .whereNotNull('user_id')
                        .and.whereNotNull('prod_id'),
                },
            );
        })
        .alterTable('cart_items', function (table) {
            table.index(['user_id'], 'cart_items_user_id_index', {
                storageEngineIndexType: 'btree',
                predicate: knex.whereNotNull('user_id'),
            });
        })
        .alterTable('favourites', function (table) {
            table.index(['user_id'], 'favourites_user_id_index', {
                storageEngineIndexType: 'btree',
                predicate: knex.whereNotNull('user_id'),
            });
        })
        .alterTable('orders', function (table) {
            table.index(['user_id'], 'orders_user_id_index', {
                storageEngineIndexType: 'btree',
                predicate: knex.whereNotNull('user_id'),
            });
        })
        .alterTable('order_items', function (table) {
            table.index(['order_id'], 'order_items_user_id_index', {
                storageEngineIndexType: 'btree',
                predicate: knex.whereNotNull('order_id'),
            });
        });
};

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable('users', function (table) {
            table.dropIndex(['email'], 'users_email_index');
        })
        .alterTable('comments', function (table) {
            table.dropIndex(
                ['user_id', 'prod_id'],
                'comments_user_id_prod_id_index',
            );
        })
        .alterTable('cart_items', function (table) {
            table.dropIndex(['user_id'], 'cart_items_user_id_index');
        })
        .alterTable('favourites', function (table) {
            table.dropIndex(['user_id'], 'favourites_user_id_index');
        })
        .alterTable('orders', function (table) {
            table.dropIndex(['user_id'], 'orders_user_id_index');
        })
        .alterTable('order_items', function (table) {
            table.dropIndex(['order_id'], 'order_items_user_id_index');
        });
}
