import { ordersService } from "../services/services.js"

export const getOrderById = async (req, res) => {
    try {
        const { _id } = req.user
        const orders = await ordersService.getAllOrderByuserId(_id)
        return ({ status: 'Success', message: 'Orden: ', orders })
    } catch (error) {
        console.log(error)
        return ({ status: 'error', message: 'Error al obtener la Orden: ', error })
    }
}

export const confirmOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        let newStatus = 'Entregada'
        const result = await ordersService.updateOrderStatus(orderId, newStatus)
        if (!result) {
            return ({ status: 'error', message: 'No existe una orden a confirmar' })
        }
        return ({ status: 'Success', message: 'Orden confirmada: ', orders })
    } catch (error) {
        return ({ status: 'error', message: 'Error al confirmar la orden', error })

    }

}

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        let newStatus = 'Cancelada'
        const result = await ordersService.updateOrderStatus(orderId, newStatus)
        if (!result) {
            return ({ status: 'error', message: 'No existe una orden a cancelar' })
        }
        return ({ status: 'Success', message: 'Orden cancelada: ', orders })
    } catch (error) {
        return ({ status: 'error', message: 'Error al cancelar la orden', error })

    }

}