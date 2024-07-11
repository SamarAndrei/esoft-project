const express = require('express');
const { redisClient } = require('../redis.js');

const CartModel = require('../reposio/cart_itemsDal.js');
const CartService = require('../service/cart_itemsService.js');

const cartService = new CartService(CartModel);

describe('CartController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    let server;
    beforeAll(async () => {
        server = express();
        const port = 1003;
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

    it('Add to cart', async () => {
        const result = await cartService.addCartItem(
            { id: 1, quantity: 1, brand: 'abibas' },
            6,
            3,
        );

        expect(result).toBeUndefined();
    });

    it('Delete from cart', async () => {
        const result = await cartService.deleteCartItem(2, 2, 1);

        expect(result).toBeUndefined();
    });

    it('Get cart', async () => {
        const result = await cartService.getCartById(14);

        expect(result).toBeInstanceOf(Array);
    });
});
