import express from 'express';
import { BadRequestError } from '../utils/index.js';
import { cartModel } from "../services/db/models/cart.model.js";
import { productModel } from "../services/db/models/product.model.js";

const viewsCartRouter = express.Router();
viewsCartRouter.get('/', async (req, res) => {
    //hardcodeo el id del carrito ya que no esta relacionado el modelo usuario con el carrito para que cada usuario tenga uno propio, solo esta hardcodeado en 
    // las vistas de handlebars.
    const cartHardcodeado = '65f876cd9f4c7511685b10fd'
    //const cartId = req.params.id;
    const cartId = cartHardcodeado;

    try {
        const cart = await cartModel.findById(cartId).lean();

        if (!cart) {
            throw new BadRequestError('Carrito no encontrado');
        }
        for (const productItem of cart.products) {
            const product = await productModel.findById(productItem.item._id).lean();
            productItem.itemDetails = product;
        }

        res.render('cart', { cart });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export { viewsCartRouter };