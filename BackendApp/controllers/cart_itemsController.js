const ApiError = require('../exceptions/api_error');


class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    };
    
    getCartById = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);

            const cart = await this.cartService.getCartById(user_id);
    
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(200).json('Корзина пуста');
            }
        } catch (e) {
            next(e);
        }
    };
    
    addCartItem = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const newCartItem = await this.cartService.addCartItem(req.body, user_id, prod_id);
            res.status(200).json(newCartItem);
        } catch (e) {
            next(e);
        }
    };

    deleteCartItem = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const deletedItem = await this.cartService.deleteCartItem(user_id, prod_id);
            res.status(200).json(deletedItem);
        } catch (e) {
            next(e);
        }
    };
};

module.exports = CartController;