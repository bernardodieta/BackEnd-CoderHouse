import { sendEmailConfirm } from "./email.controllers.js";
import { userService, productService, cartService, ordersService } from '../services/services.js'

export const addToCart = async (userId, productId, quantity) => {
    console.log(userId, productId, quantity)
    try {
        const cart = await cartService.addProductToCart(
            { user: userId },
            { items: { product: productId, quantity: quantity } },
            { new: true, upsert: true }
        );
        return cart;
    } catch (error) {
        throw new Error('Error al agregar producto: ' + error.message);
    }
};
export const removeProductFromCart = async (userId, productId, quantityToRemove) => {
    try {
        const result = await cartService.removeProductFromCart(userId, productId, quantityToRemove);
        return result;
    } catch (error) {
        throw new Error('Error al quitar producto: ' + error.message);
    }
}

export const remProduct = async (userId, productId) => {
    try {
        const result = await cartService.removeProduct(userId, productId);
        if (result.modifiedCount === 0) {
            throw new Error("No se encontró el producto o el usuario no tiene ese producto en su carrito");
        }
        return result;
    } catch (error) {
        throw new Error('Error al quitar producto: ' + error.message);
    }
}

export const getCartUser = async (userId) => {
    try {
        if (!userId) {
            return { message: 'el usuario no tiene un carrito' }
        }
        const cart = await cartService.getCartByUserId(userId);
        return cart;
    } catch (error) {
        throw new Error('Error al intenar obtener el carrito: ' + error.message);
    }
}

export const purchase = async (userId, req, res) => {
    let totalPriceforOneProduct = 0;
    let productosConStock = [];
    let productosSinStock = [];
    try {
        const cart = await cartService.getCartByUserId(userId);
        const user = await userService.userById(userId);

        for (const item of cart.items) {
            const product = await productService.getProductById(item.product._id);

            if (item.quantity <= product.stock) {
                let productPrice = item.product.price * item.quantity;
                totalPriceforOneProduct += Number(productPrice);
                productosConStock.push({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                    total: productPrice
                });
            } else {

                productosSinStock.push({
                    product: item.product.title
                });
            }
        }
        const newOrder = {
            customer: user._id,
            email: user.email,
            products: productosConStock,
            total: totalPriceforOneProduct,
            date: new Date()
        };

        for (const item of productosConStock) {
            const productToUpdate = await productService.getProductById(item.product._id);
            const result = await productService.updateProductStock(item.product, productToUpdate.stock - item.quantity);
            const deleteFromCart = await remProduct(userId, item.product._id)
        }

        const order = await ordersService.saveOrder(newOrder)
        sendEmailConfirm(newOrder);
        return order
    } catch (error) {
        return error
    }
};

