export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }
    removeProductFromCart = async (userId, productId, quantityToRemove) => {
        return this.dao.removeProductFromCart(userId, productId, quantityToRemove)
    }

    removeProduct = async (userId, productId, res) => {
        return this.dao.removeProduct(userId, productId, res)
    }

    addProductToCart = async (userIdObject, productDetails) => {
        return this.dao.addProductToCart(userIdObject, productDetails)
    }
    getCartByUserId = async (userId) => {
        return this.dao.getCartByUserId(userId)
    }
    createEmptyCart = async (userId) => {
        return this.dao.createEmptyCart(userId)
    }
 


}