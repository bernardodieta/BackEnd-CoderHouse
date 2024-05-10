import { sendEmailConfirm } from "./email.controllers.js";
import { userService, productService, cartService, ordersService } from '../services/services.js'
import mongoose from 'mongoose';


export const addToCart = async (req, res) => {
    try {
        const { _id } = req.user;
        //console.log(_id)
        const { productId, quantity } = req.body;
       
        const cart = await cartService.addProductToCart(
            { user: _id },
            { items: { product: productId, quantity: quantity } },
            { new: true, upsert: true }
        );
        return ({ status: 'Success', message: 'Producto Agregado Correctamente', cart });
    } catch (error) {
        console.log(error)
        return ({ status: 'error', message: 'Error al agregar el producto al carrito', error })
    }
};
export const removeProductFromCart = async (req, res) => {
    try {
        const { _id } = req.user
        const { productId, quantity } = req.params;
        const quantityToRemove = quantity
        if (isNaN(quantityToRemove) || quantityToRemove < 1) {
            return ({ message: "Cantidad invalida. Debe ser un numero positivo." });

        }
        const result = await cartService.removeProductFromCart(_id, productId, quantityToRemove);
        return ({ status: 'Success', message: 'Producto eliminado del carrito correctamente', result });
    } catch (error) {
        return ({ status: 'error', message: 'Error al quitar cantidad de el producto del carrito', error })
    }
}

export const remProduct = async (req, res) => {
    try {
        const { _id } = req.user
        const { productId } = req.params
        const result = await cartService.removeProduct(_id, productId);
        if (result.modifiedCount === 0) {
            return ({ status: 'error', message: "No se encontró el producto o el usuario no tiene ese producto en su carrito" });
        }
        return ({ status: 'Success', message: 'Producto eliminado del carrito correctamente', result });
    } catch (error) {
        return ({ status: 'error', message: 'Error al quitar el producto del carrito', error })
    }
}

export const getCartUser = async (req, res) => {
    try {
        const { _id } = req.user
        if (!_id) {
            return ({ status: 'error', message: 'el usuario no tiene un carrito' })
        }
        const cart = await cartService.getCartByUserId(_id);
        return ({ status: 'Success', message: 'Carrito de usuario:', cart });
    } catch (error) {
        return ({ status: 'error', message: 'Error al intentar obtener el carrito', error })
    }
}

export const purchase = async (req, res) => {
    let totalPriceforOneProduct = 0;
    let productosConStock = [];
    let productosSinStock = [];
    try {
        const { _id } = req.user;
        const cart = await cartService.getCartByUserId(_id);
        const user = await userService.userById(_id);

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
            const deleteFromCart = await remProduct(_id, item.product._id)
        }

        const order = await ordersService.saveOrder(newOrder)
        sendEmailConfirm(newOrder);
        return ({ status: 'Success', message: 'Orden de compra generada correctamente', order })
    } catch (error) {
        return ({ status: 'error', message: 'Error al intentar generar la orden de compra', error })
    }
};

