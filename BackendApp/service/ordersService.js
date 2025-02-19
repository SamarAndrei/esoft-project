class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    async createOrder(orderData, user_id) {
        const newOrderData = { user_id: user_id, status: orderData.status };
        const newOrderItemsData = orderData.data;
        return this.orderModel.create(newOrderData, newOrderItemsData);
    }

    async getAllOrders(user_id) {
        return this.orderModel.getAll(user_id);
    }

    async getOrderById(order_id) {
        return this.orderModel.getById(order_id);
    }
}

module.exports = OrderService;
