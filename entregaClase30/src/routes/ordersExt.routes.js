import CustomRouter from "./customs.routes.js";
import { getOrderById, confirmOrder, cancelOrder } from "../controllers/orders.controllers.js";
export class OrdersRoutes extends CustomRouter {
    init() {
        this.get('/:userId', ['PUBLIC'], async (req, res) => {
            const result = await getOrderById(req, res)
            result.status === 'error'
                ? res.sendClientError(result.message)
                : res.sendSuccess(result)
        })

        this.post('/confirm/:orderId', ['PUBLIC'], async (req, res) => {
            const result = await confirmOrder(req, res)
            result.status === 'error'
                ? res.sendClientError(result.message)
                : res.sendSuccess(result)
        })

        this.post('/cancel/:orderId', ['PUBLIC'], async (req, res) => {
            const result = await cancelOrder(req, res)
            result.status === 'error'
                ? res.sendClientError(result.message)
                : res.sendSuccess(result)
        })

    }
}

