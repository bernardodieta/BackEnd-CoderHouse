import { orderModel } from './models/ticket.model.js';

export default class OrderServicesDao {
    constructor() { }

    saveOrder = async (orderData) => {
        try {
            const newOrder = await orderModel.create(orderData);
            return newOrder;
        } catch (error) {

            req.logger.error(`${req.method} en ${req.url} - Error:'Error al guardar la orden.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al guardar la orden.')
        }
    }

    getOrdersByCustomerId = async (customerId) => {
        try {
            const orders = await orderModel.find({ customer: customerId }).populate('products.product');
            return orders;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener la orden por ID' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener la orden por ID')
        }
    }

    getAllOrderByuserId = async (userId) => {
        try {
            const orders = await orderModel.find({ customer: userId })
            console.log('order:', orders)
            return orders
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener todas las ordenes de este usuario' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener todas las ordenes de este usuario')
        }
    }

    getOrderById = async (orderId) => {
        try {
            const order = await orderModel.findById(orderId).populate('products.product');
            return order;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener la orden por ID' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener la orden por ID')
        }
    }

    updateOrderStatus = async (orderId, newStatus) => {
        try {

            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { $set: { status: newStatus } },
                { new: true }
            );
            return updatedOrder;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al actualizar el estado de la orden.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al actualizar el estado de la orden.')
        }
    }
}


