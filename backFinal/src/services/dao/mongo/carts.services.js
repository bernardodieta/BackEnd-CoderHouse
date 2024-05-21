import cartModel from './models/carts.models.js';
import { ClientError, DatabaseError } from '../../../utils/errors.js'
import { productService } from '../../services.js';


export default class CartServicesDao {
    constructor() {

    }

    addProductToCart = async (userIdObject, productDetails) => {
        try {
            const userId = userIdObject.user;
            const productId = productDetails.items.product;
            const quantity = productDetails.items.quantity;
            const productoExist = await productService.getProductById(productId)
            if (!productoExist) throw new ClientError('El producto que quiere agrear al carrito no existe.')
            let cart = await cartModel.findOne({ user: userId });
            if (!cart) {
                cart = new cartModel({ user: userId, items: [] });
            }
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity: quantity });
            }
            await cart.save();
            return cart;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al agregar el producto al carrito.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al agregar el producto al carrito.')
        }
    }
    removeProduct = async (_id, productId, res) => {
        try {
            const initialDoc = await cartModel.findOne({ user: _id });
            const hasProduct = initialDoc && initialDoc.items.some(item => item.product.toString() === productId.toString());
            console.log(hasProduct);
            if (hasProduct === false) {
                throw new ClientError('El producto que quiere quitar del carrito no existe.')
            }
            const result = await cartModel.updateOne(
                { user: _id },
                { $pull: { items: { product: productId } } }
            );

            if (result.modifiedCount <= 0)
                throw new ClientError('Ocurrio un error al intentar quitar el producto del carrito.')
            return result
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al remover el producto del carrito.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al remover el producto del carrito.')
        }
    }

    removeProductFromCart = async (userId, productId, quantityToRemove) => {
        try {
            const cart = await cartModel.findOne({ user: userId });
            if (!cart) {
                throw new ClientError('No se encuentra un carrito asignado a este usuario.')
            }
            const productoExist = await productService.getProductById(productId)
            if (!productoExist) throw new ClientError('El producto no existe')
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                if (item.quantity > quantityToRemove) {
                    item.quantity -= quantityToRemove;
                } else if (item.quantity === quantityToRemove) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    throw new ClientError('No se pueden quitar mas unidadades de las que hay.')
                }
                await cart.save();
                return cart;
            } else {
                throw new ClientError()
            }
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al quitar cantidad de un producto.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al quitar cantidad de un producto.')
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
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al crear el carrito vacio.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al crear el carrito vacio.')
        }
    }

    getCartByUserId = async (userId) => {
        try {
            console.log("Usuario que me llego de:", userId);
            let cart = await cartModel.findOne({ user: userId }).populate('items.product');
            if (!cart) {
                throw new ClientError('No se encuentra un carrito asignado a este usuario.')
            }
            return cart;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener el carrito por ID.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener el carrito por ID.')
        }
    }

}

