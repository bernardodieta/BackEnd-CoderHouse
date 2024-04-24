import CustomRouter from "./customs.routes.js";
import { addToCart, getCartUser, removeProductFromCart } from "../controllers/carts.controllers.js";

export class CartRouter extends CustomRouter {
    init() {
        this.post('/:userId/add', ['PUBLIC'], async (req, res) => {
            const { userId } = req.params;
            const { productId, quantity } = req.body;
            try {
                const cart = await addToCart(userId, productId, quantity);
                res.status(200).json(cart);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.get('/:userId?', ['PUBLIC'], async (req, res) => {
            const { userId } = req.params;
            try {
                const cartUser = await getCartUser(userId);
                res.status(200).json(cartUser);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.delete('/:userId/:productId/:quantity', ['PUBLIC'], async (req, res) => {
            const { userId, productId, quantity } = req.params;
            try {
                const quantityToRemove = quantity
                if (isNaN(quantityToRemove) || quantityToRemove < 1) {
                    res.status(400).json({ message: "Invalid quantity. It must be a positive number." });
                    return;
                }
                const result = await removeProductFromCart(userId, productId, quantityToRemove);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

    }
}