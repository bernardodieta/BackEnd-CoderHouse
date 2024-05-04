export default class OrdersRepository{
    constructor(dao){
        this.dao = dao
    }

    saveOrder = async (orderData) => {
        return this.dao.saveOrder(orderData)
    }

    getOrdersByCustomerId = async (customerId) => {
        return this.dao.getOrdersByCustomerId(customerId)
    }

    getAllOrderByuserId = async (userId) => {
        return this.dao.getAllOrderByuserId(userId)
    }
    getOrderById = async (orderId) => {
        return this.dao.getOrderById(orderId)
    }

    updateOrderStatus = async (orderId, newStatus) => {
        return this.dao.updateOrderStatus(orderId, newStatus)
    }
}