import { ordersService } from "../services/services.js"

export const getOrderById = async (req, res) => {
    const { userId } = req.params
    console.log(userId)
    try {
        const orders = await ordersService.getAllOrderByuserId(userId)
        return orders
    } catch (error) {
        console.log(error)
        return error
    }
}

export const confirmOrder = async (req, res) => {
    const { orderId } = req.params
    let newStatus = 'Entregada'
    const result = await ordersService.updateOrderStatus(orderId, newStatus)
    if (!result) {
        return result
    }
    return result
}

export const cancelOrder = async (req, res) => {
    const { orderId } = req.params
    let newStatus = 'Cancelada'
    const result = await ordersService.updateOrderStatus(orderId, newStatus)
    if (!result) {
        return result
    }
    return result
}