import cartModel from './models/carts.models.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

export default class CartServicesDao {
    constructor() {
    }

    addProductToCart = async (userIdObject, productDetails) => {
        try {
            //console.log('asdasd',userIdObject);
            const userId = userIdObject.user;
            const productId = productDetails.items.product;
            const quantity = productDetails.items.quantity;

            let cart = await cartModel.findOne({ user: userId });

            if (!cart) {
                cart = new cartModel({ user: userId, items: [] });
            }
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                // console.log('cantidad que me llega', quantity)
                // console.log('cantidad que me tiene Cart antes de', cart.items[itemIndex].quantity)
                cart.items[itemIndex].quantity += quantity;
                // console.log('cantidad que me tiene Cart despues de', cart.items[itemIndex].quantity)

            } else {
                cart.items.push({ product: productId, quantity: quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error Agregando el producto al carrio...', error);
            return error
        }
    }
    removeProduct = async (_id, productId) => {
        try {
            if (!mongoose.isValidObjectId(_id) || !mongoose.isValidObjectId(productId)) {
                throw new Error("Invalid ID format");
            }
            const result = await cartModel.updateOne(
                { user: _id },
                { $pull: { items: { product: productId } } }
            );
            return result;
        } catch (error) {
            return error
        }
    }

    removeProductFromCart = async (userId, productId, quantityToRemove) => {

        try {
            const cart = await cartModel.findOne({ user: userId });
            if (!cart) {
                return { message: "No se encuentra un carrito asignado a este usuario." };
            }
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                if (item.quantity > quantityToRemove) {
                    item.quantity -= quantityToRemove;
                } else if (item.quantity === quantityToRemove) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    return { message: "No se pueden quitar mas unidades de las que hay." };
                }
                await cart.save();
                return cart;
            } else {
                return { message: "Producto no encontrado en el carrito" };
            }

        } catch (error) {
            console.error('Ocurrio un error actualizando la cantidad en el carrito:', error);
            throw error;
        }
    }
    createEmptyCart = async (userId) => {
        try {
            const newCart = await cartModel.create({
                user: userId,
                items: []
            });

            return newCart;
        } catch (error) {
            console.error('Error al crear un carrito vacío:', error);
            return error;
        }
    }

    getCartByUserId = async (userId) => {
        try {
            const isValidObjectId = (userId) => {
                return mongoose.Types.ObjectId.isValid(userId);
            }

            if (!isValidObjectId(userId)) {
                console.error('ID del producto inválido:', userId);
                return;
            }
            console.log("Usuario que me llego de:", userId);
            let cart = await cartModel.findOne({ user: userId }).populate('items.product');
            if (!cart) {
                return { message: "No se encontro un carrito para este usuario" };
            }

            console.log("Carrito Encontrado:", cart);
            return cart;
        } catch (error) {
            console.error('Error solicitando el carrito:', error);
            throw error;
        }
    }

}
