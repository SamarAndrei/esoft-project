class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    };
    
    getCartById = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);

            const cart = await this.cartService.getCartById(user_id);
    
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).send('Корзина не найдена');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    addCartItem = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const newCartItem = await this.cartService.addCartItem(req.body, user_id, prod_id);
            res.status(200).json(newCartItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    deleteCartItem = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const deletedItem = await this.cartService.deleteCartItem(user_id, prod_id);
            res.status(200).json(deletedItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
};

module.exports = CartController;