class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    async createOrder(orderData, user_id) {
        const newOrderData = { user_id: user_id, status: orderData.status };
        const newOrderItemsData = {
            prod_id: orderData.prod_id,
            quantity: orderData.quantity,
        };
        return this.orderModel.create(newOrderData, newOrderItemsData);
    }

    async getAllOrders(user_id) {
        return this.orderModel.getAll(user_id);
    }

    async getOrderById(user_id, order_id) {
        return this.orderModel.getById(user_id, order_id);
    }
}

module.exports = OrderService;
