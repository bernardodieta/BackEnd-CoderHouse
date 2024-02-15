import express from 'express';
import { Router } from 'express';
import ProductManager from '../Products/productManager.js';


const productRouter = express.Router();
const productManager = new ProductManager();

productRouter.get('/api/products', async (req, res) => {
    productManager.getAllProducts()
    const limit = req.query.limit;
    let result;
    if (limit) {
        result = await productManager.getAllProducts(limit);
    } else {
        result = await productManager.getAllProducts();
    }
    result.success ? res.status(200).json(result) : res.status(400).json(result)
});


productRouter.get('/api/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await productManager.getProductById(pid);
    result.success ? res.status(200).json(result) : res.status(400).json(result)
})

productRouter.post('/api/product', async (req, res) => {
    const product = req.body;
    const result = await productManager.addProduct(product)
    result.success ? res.status(200).json(result) : res.status(400).json(result)

})

productRouter.put('/api/product', async (req, res) => {
    const product = req.body;
    const result = await productManager.updateProduct(product)
    result.success ? res.status(200).json(result) : res.status(400).json(result)
})

productRouter.delete('/api/product/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await productManager.deleteProduct(pid)
    result.success ? res.status(200).json(result) : res.status(400).json(result)


})

export default productRouter;