import CartServices from "../services/dao/mongo/carts.services.js";
const cartServices = new CartServices()

export const addToCart = async (userId, productId, quantity) => { 
    console.log(userId, productId, quantity)
    try {
        const cart = await cartServices.addProductToCart(
            { user: userId },
            { items: { product: productId, quantity: quantity }  },
            { new: true, upsert: true } 
        );
        return cart;
    } catch (error) {
        throw new Error('Error al agregar producto: ' + error.message);
    }
};
export const removeProductFromCart = async (userId, productId, quantityToRemove) => {
    try {
        const result = await cartServices.removeProductFromCart(userId, productId, quantityToRemove);
        return result;
    } catch (error) {
        throw new Error('Error al quitar producto: ' + error.message);
    }
}

export const getCartUser = async (userId) => {
    try {
        if(!userId){
            return {message:'el usuario no tiene un carrito'}
        }
        const cart = await cartServices.getCartByUserId(userId); 
        return cart;
    } catch (error) {
        throw new Error('Error al intenar obtener el carrito: ' + error.message);
    }
}

