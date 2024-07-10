const express = require('express');
const { redisClient } = require('../redis.js');

const OrdersModel = require('../reposio/ordersDal.js');
const OrdersService = require('../service/ordersService.js');

const ordersService = new OrdersService(OrdersModel);

describe('OrdersController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    let server;
    beforeAll(async () => {
        server = express();
        const port = 1005;
        server.use(express.json());

        server.listen(port, 'localhost', () => {
            console.log(`Server listening at http://localhost:${port}`);
            try {
                redisClient
                    .on('error', err => console.log('redisClient error'))
                    .connect();
            } catch (e) {
                console.log(e);
            }
        });
    });

    it('Get orders', async () => {
        const result = await ordersService.getAllOrders(14);

        expect(result).toBeInstanceOf(Array);
    });

    it('Get the order', async () => {
        const result = await ordersService.getOrderById(14);

        expect(result).toBeInstanceOf(Array);
    });
});
