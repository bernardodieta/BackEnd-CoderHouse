import CustomRouter from "./customs.routes.js";
import { addToCart, getCartUser, removeProductFromCart, purchase, remProduct } from "../controllers/carts.controllers.js";
import { validateQuantity } from '../services/middlewares/validateName.js'

export class CartRouter extends CustomRouter {
    init() {
        this.post('/add', ['USER'], validateQuantity, async (req, res, next) => {
            addToCart(req, res, next);
        });

        this.get('/', ['USER'], async (req, res) => {
            getCartUser(req, res);
        });

        this.put('/remove/:productId', ['USER'], async (req, res, next) => {
            remProduct(req, res, next)
        })

        this.delete('/:productId/:quantity', ['USER'], validateQuantity, async (req, res, next) => {
            removeProductFromCart(req, res, next);
        });

        this.post('/purchase', ['USER'], async (req, res, next) => {
            purchase(req, res, next)
        })

    }
}