import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("table_name").del();

    // Inserts seed entries
    await knex("roles").insert([
        { id: 1, name: "admin" },
        { id: 2, name: "user" },
    ]);

    await knex('production').insert([
        {
            id: 1,
            brand: 'Beppi',
            size: [39, 40, 41],
            type: 'Обувь',
            description: 'Description кеды',
            img: '{https://a.lmcdn.ru/img389x562/R/T/RTLADJ955701_23097435_1_v1.jpg,https://a.lmcdn.ru/img600x866/R/T/RTLADJ955701_23097436_2_v1.jpg,https://a.lmcdn.ru/img600x866/R/T/RTLADJ955701_23097437_3_v1.jpg,https://a.lmcdn.ru/img600x866/R/T/RTLADJ955701_23097438_4_v1.jpg}',
            price: 2270,
            stock_quantity: 10,
            gender: 'Мужское',
        },
        {
            id: 2,
            brand: 'Reggata',
            size: [40, 41, 42],
            type: 'Обувь',
            description: 'Description кроссовки',
            img: '{https://a.lmcdn.ru/img389x562/M/P/MP002XM00KF6_23294896_1_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XM00KPO_23305369_2_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XM00KPO_23305370_3_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XM00KPO_23305371_4_v1.jpg}',
            price: 4179,
            stock_quantity: 10,
            gender: 'Мужское',
        },
        {
            id: 3,
            brand: 'Ekonika Premium',
            size: [35, 36, 37],
            type: 'Обувь',
            description: 'Description полусапоги',
            img: '{https://a.lmcdn.ru/img389x562/M/P/MP002XW131KN_21211268_1_v2.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XW131KN_21220984_9_v1_2x.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XW131KN_21211269_2_v2.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XW131KN_21211270_3_v2.jpg}',
            price: 14990,
            stock_quantity: 10,
            gender: 'Женское',
        },
        {
            id: 4,
            brand: 'Капитошка',
            size: [19, 20, 21],
            type: 'Обувь',
            description: 'Description сандалии',
            img: '{https://a.lmcdn.ru/img389x562/M/P/MP002XB02IRJ_23114182_1_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XB02IRJ_23114183_2_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XB02IRJ_23114184_3_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XB02IRJ_23114185_4_v1.jpg}',
            price: 2400,
            stock_quantity: 10,
            gender: 'Мужское',
        },
        {
            id: 5,
            brand: '2Mood',
            size: [39, 40, 41],
            type: 'Обувь',
            description: 'Description сапоги',
            img: '{https://a.lmcdn.ru/img389x562/M/P/MP002XW14QSN_21613573_1_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XW14QSN_21622177_9_v1_2x.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XW14QSN_21613574_2_v1.jpg,https://a.lmcdn.ru/img600x866/M/P/MP002XW14QSN_21613576_4_v1.jpg}',
            price: 9990,
            stock_quantity: 10,
            gender: 'Женское',
        },
    ]);
};
