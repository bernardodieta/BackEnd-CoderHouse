import { sendEmailConfirm } from "./email.controllers.js";
import { productService, cartService, ordersService } from '../services/services.js'
import { catchedAsync } from "../utils/catchedAsync.js";
import { response } from "../utils/response.js";
import { ClientError, NotFoundError, ValidationError } from "../utils/errors.js";

const addToCart = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { productId, quantity } = req.body;
        const result = await productService.getProductById(productId, req.logger)
        if (result.owner === req.user.email) {
            throw new ValidationError('No puede comprar su propio producto')
        }
        const cart = await cartService.addProductToCart(
            { user: _id },
            { items: { product: productId, quantity: quantity } },
            { new: true, upsert: true }, req.logger
        );
        response(res, 201, 'Producto Agregado Correctamente', cart)
    } catch (error) {
        next(error)
    }
};

const removeProductFromCart = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { productId, quantity } = req.params;
        const quantityToRemove = quantity
        const result = await cartService.removeProductFromCart(_id, productId, quantityToRemove, req.logger);
        response(res, 201, 'Cantidad modificada correctamente.', result)
    } catch (error) {
        next(error)
    }

}

const remProduct = async (req, res) => {
    try {
        const { _id } = req.user
        const { productId } = req.params
        const result = await cartService.removeProduct(_id, productId, req.logger);
        if (result.matchedCount === 0) {
            req.logger.warning(`${req.method} en ${req.url} - Error: "No se encontró el producto o el usuario no tiene ese producto en su carrito" at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError("No se encontró el producto o el usuario no tiene ese producto en su carrito");
        }
        response(res, 201, 'Producto eliminado del carrito correctamente', result)
    } catch (error) {
        next()
    }
}

const remProductbuy = async (_id, productId, res, req, next) => {
    try {
        const result = await cartService.removeProduct(_id, productId, req.logger);
        if (result.modifiedCount === 0) {
            req.logger.warning(`${req.method} en ${req.url} - Error: "No se encontró el producto o el usuario no tiene ese producto en su carrito" at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError("No se encontró el producto o el usuario no tiene ese producto en su carrito");
        }
        response(res, 201, 'Compra Realizada correctamente.')
    } catch (error) {
        next(error)
    }
}

const getCartUser = async (req, res, next) => {
    try {
        const { _id } = req.user
        const cart = await cartService.getCartByUserId(_id, req.logger);
        if (!cart) {
            req.logger.warning(`${req.method} en ${req.url} - Error: "No se encontro un carrito para ese usuario" at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

            throw new NotFoundError('No se encontro un carrito para ese usuario')
        }
        response(res, 200, cart)
    } catch (error) {
        next(error)
    }

}

const purchase = async (req, res, next) => {
    try {
        const { _id, email } = req.user;
        const cart = await cartService.getCartByUserId(_id, req.logger);
        if (!cart.items.length) {
            req.logger.warning(`${req.method} en ${req.url} - Error: 'No hay productos para comprar' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError('No hay productos para comprar');
        }
        const { productosConStock, productosSinStock, totalPrice } = await processCartItems(cart.items, req);

        if (productosConStock.length === 0) {
            req.logger.warning(`${req.method} en ${req.url} - Error: 'No hay productos con stock suficiente para proceder con la compra.' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new ClientError('No hay productos con stock suficiente para proceder con la compra.');
        }
        const newOrder = createOrder(_id, email, productosConStock, totalPrice);
        await updateStockAndRemoveFromCart(productosConStock, _id, res, req, next);
        const order = await ordersService.saveOrder(newOrder, req.logger);
        sendEmailConfirm(newOrder, res);
        response(res, 201, order);
    } catch (error) {
        next(error)
    }
};

const processCartItems = async (items, req, next) => {
    try {
        let totalPrice = 0;
        let productosConStock = [];
        let productosSinStock = [];

        const productPromises = items.map(item => productService.getProductById(item.product._id, req.logger));
        const products = await Promise.all(productPromises);

        products.forEach((product, index) => {
            const item = items[index];
            if (item.quantity <= product.stock) {
                let productPrice = item.product.price * item.quantity;
                totalPrice += productPrice;
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
        });

        return { productosConStock, productosSinStock, totalPrice };
    } catch (error) {
        console.log(error)
        next(error)
    }

};

const createOrder = (userId, email, productosConStock, totalPrice) => ({
    customer: userId,
    email,
    products: productosConStock,
    total: totalPrice,
    date: new Date()
});

const updateStockAndRemoveFromCart = async (productosConStock, userId, res, req, next) => {
    try {
        const updatePromises = productosConStock.map(async (item) => {
            const productToUpdate = await productService.getProductById(item.product, req.logger);
            await productService.updateProductStock(item.product, productToUpdate.stock - item.quantity, req.logger, next);
            await remProductbuy(userId, item.product, res, next);
        });
        await Promise.all(updatePromises);
    } catch (error) {
        console.log(error)
        next(error)
    }

};

const TuningaddToCart = catchedAsync(addToCart);
const TuningremoveProductFromCart = catchedAsync(removeProductFromCart);
const TuningremProduct = catchedAsync(remProduct);
const TuningremProductbuy = catchedAsync(remProductbuy);
const TuninggetCartUser = catchedAsync(getCartUser);
const Tuningpurchase = catchedAsync(purchase);
export {
    TuningaddToCart as addToCart,
    TuningremoveProductFromCart as removeProductFromCart,
    TuningremProduct as remProduct,
    TuningremProductbuy as remProductbuy,
    TuninggetCartUser as getCartUser,
    Tuningpurchase as purchase
};