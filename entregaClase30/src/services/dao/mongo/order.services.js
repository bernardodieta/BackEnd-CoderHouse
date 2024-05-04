import { orderModel } from './models/ticket.model.js';

export default class OrderServicesDao {
    constructor() { }

    saveOrder = async (orderData) => {
        try {
            const newOrder = await orderModel.create(orderData);
            return newOrder;
        } catch (error) {
            console.error("Error al guardar la orden:", error);
            throw error;
        }
    }

    getOrdersByCustomerId = async (customerId) => {
        try {
            const orders = await orderModel.find({ customer: customerId }).populate('products.product');
            return orders;
        } catch (error) {
            console.error("Error al recuperar las órdenes:", error);
            throw error;
        }
    }

    getAllOrderByuserId = async (userId) => {
        try {
            const orders = await orderModel.find({ customer: userId })
            console.log('order:', orders)
            return orders
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getOrderById = async (orderId) => {
        try {
            const order = await orderModel.findById(orderId).populate('products.product');
            return order;
        } catch (error) {
            return error
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
            console.error("Error al actualizar el estado de la orden:", error);
            throw error;
        }
    }
}
