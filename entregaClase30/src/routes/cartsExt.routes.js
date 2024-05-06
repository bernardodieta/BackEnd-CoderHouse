import CustomRouter from "./customs.routes.js";
import { addToCart, getCartUser, removeProductFromCart, purchase, remProduct } from "../controllers/carts.controllers.js";

export class CartRouter extends CustomRouter {
    init() {
        this.post('/:userId/add', ['PUBLIC'], async (req, res) => {
            const { userId } = req.params;
            const { productId, quantity } = req.body;
            try {
                const cart = await addToCart(userId, productId, quantity);
               res.sendSuccess(cart);
            } catch (error) {
                console.log(error)
                res.sendClientError(error);
            }
        });

        this.get('/:userId?', ['PUBLIC'], async (req, res) => {
            const { userId } = req.params;
            try {
                const cart = await getCartUser(userId);
                res.sendSuccess({ message: 'Usuario solicitado:', cart });
            } catch (error) {
                res.sendClientError(error);
            }
        });

        this.put('/remove/:userId/:productId', ['PUBLIC'], async (req, res) => {
            try {
                const { userId, productId } = req.params
                console.log(userId, productId)
                const result = await remProduct(userId, productId)
                res.status(200).json(result)
            } catch (error) {
                res.status(500).json({ error: error.message });
            }

        })

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

        this.post('/:userId/purchase', ['PUBLIC'], async (req, res) => {
            const { userId } = req.params;
            try {
                const result = await purchase(userId, req, res)

                return res.status(200).json(userId)

            } catch (error) {
                return res.status(400).error

            }

        })

    }
}