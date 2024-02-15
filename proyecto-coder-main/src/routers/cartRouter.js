import express from 'express';
import CartManager from '../Cart/cartManager.js'


const cartRouter = express.Router();

const cartManager = new CartManager()

cartRouter.get('/api/carts', async (req, res) => {
    const result = await cartManager.getCartsList()
    result.success ? res.status(200).json(result.parseList) : res.status(400).json(result)

});

cartRouter.get('/api/cart/:cid', async (req, res) => {
    const cid = req.params.cid;
    const result = await cartManager.getCartById(cid)
    result.success ? res.status(200).json(result.result) : res.status(400).json(result)

})

cartRouter.post('/api/carts/', async (req, res) => {
    const result = await cartManager.createNewCart()
    result.success ? res.status(200).json(result.carts) : res.status(400).json(result)
});

cartRouter.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartManager.addProductToCart(cid, pid);
    result.success ? res.status(200).json(result.cart) : res.status(400).json(result)

});
export default cartRouter;