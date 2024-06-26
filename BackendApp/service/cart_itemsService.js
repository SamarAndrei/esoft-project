class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    };

    async addCartItem(cartItemData, user_id, prod_id) {
        const newCartItemData = {user_id: user_id, prod_id, quantity: cartItemData.quantity};
        return this.cartModel.create(newCartItemData); 
    };

    async getCartById(user_id) {
        return this.cartModel.getAll(user_id);
    };

    async deleteCartItem(user_id, prod_id) {
        return this.cartModel.delete(user_id, prod_id);
    };
};

module.exports = CartService;