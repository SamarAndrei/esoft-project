const ApiError = require('../exceptions/api_error');

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    getAllOrders = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);

            const orders = await this.orderService.getAllOrders(user_id);
            res.status(200).json(orders);
        } catch (e) {
            next(e);
        }
    };

    getOrderById = async (req, res, next) => {
        try {
            const order_id = parseInt(req.params.order_id, 10);

            const order = await this.orderService.getOrderById(order_id);

            if (order) {
                res.status(200).json(order);
            } else {
                throw ApiError.NotFound(`Заказ не найден`);
            }
        } catch (e) {
            next(e);
        }
    };

    createOrder = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);
            const newProdItem = await this.orderService.createOrder(
                req.body,
                user_id,
            );
            res.status(200).json(newProdItem);
        } catch (e) {
            next(e);
        }
    };
}

module.exports = OrderController;
