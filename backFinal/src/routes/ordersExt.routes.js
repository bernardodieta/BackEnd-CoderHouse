import CustomRouter from "./customs.routes.js";
import { getOrderById, confirmOrder, cancelOrder } from "../controllers/orders.controllers.js";
export class OrdersRoutes extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            getOrderById(req, res)
        })

        this.post('/confirm/:orderId', ['PUBLIC'], async (req, res) => {
            confirmOrder(req, res)
        })

        this.post('/cancel/:orderId', ['PUBLIC'], async (req, res) => {
            cancelOrder(req, res)
        })

    }
}

