import CustomRouter from "./customs.routes.js";
import { addToCart, getCartUser, removeProductFromCart, purchase, remProduct } from "../controllers/carts.controllers.js";

export class CartRouter extends CustomRouter {
    init() {
        this.post('/add', ['USER'], async (req, res) => {
            const cart = await addToCart(req, res);
            cart.status === 'error' ? res.sendClientError(cart.message) : res.sendSuccess(cart)
        });

        this.get('/', ['USER'], async (req, res) => {
            const cart = await getCartUser(req, res);
            cart.status === 'error' ? res.sendClientError(cart.message) : res.sendSuccess(cart)
        });

        this.put('/remove/:productId', ['USER'], async (req, res) => {
            const result = await remProduct(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })

        this.delete('/:productId/:quantity', ['USER'], async (req, res) => {
            const result = await removeProductFromCart(req, res);
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)

        });

        this.post('/:userId/purchase', ['USER'], async (req, res) => {
            const result = await purchase(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })

    }
}