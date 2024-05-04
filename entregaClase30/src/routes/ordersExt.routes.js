import CustomRouter from "./customs.routes.js";
import { getOrderById, confirmOrder,cancelOrder } from "../controllers/orders.controllers.js";
export class OrdersRoutes extends CustomRouter {
    init() {
        this.get('/:userId', ['PUBLIC'], async (req, res) => {
            try {
                const result = await getOrderById(req, res)
                res.sendSuccess({ message: "Lista de todas las compras realizadas", results: result })
            } catch (error) {
                res.sendClientError({ message: "Error obteniendo las compras realizadas" })
            }
        })

        this.post('/confirm/:orderId', ['PUBLIC'], async (req, res) => {
            try {
                const result = await confirmOrder(req, res)
                res.sendSuccess({ message: "Orden Confirmada, entrega realizada", results: result })
            } catch (error) {
                console.log(error)
                res.sendClientError({ message: "Ocurrio un error confirmado la entrega" })
            }
        })

        this.post('/cancel/:orderId', ['PUBLIC'], async (req, res) => {
            try {
                const result = await cancelOrder(req, res)
                res.sendSuccess({ message: "Orden cancelada con éxito.", results: result })
            } catch (error) {
                console.log(error)
                res.sendClientError({ message: "Ocurrio un error cancelado la compra" })
            }
        })

    }
}

