class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    };

    getAllOrders = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);

            const orders = await this.orderService.getAllOrders(user_id);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    getOrderById = async (req, res) => {
        try {
            const order_id = parseInt(req.params.order_id, 10);
            const user_id = parseInt(req.params.user_id, 10);

            const order = await this.orderService.getOrderById(user_id, order_id);
    
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).send('Заказ не найден');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    
    createOrder = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);

            const newProdItem = await this.orderService.createOrder(req.body, user_id);
            res.status(200).json(newProdItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
};

module.exports = OrderController;