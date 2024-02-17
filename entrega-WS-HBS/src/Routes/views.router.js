import express from 'express'
import ProductManager from '../Products/productManager.js';

const router = express.Router();
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const productList = await productManager.getAllProducts();
    res.render('home', { style: "/css/index.css", productList })
})

router.get('/realtimeproducts', async (req, res) => {
    res.render('realtimeproduct', { style: "/css/index.css" })
})



export default router