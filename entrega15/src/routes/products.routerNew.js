import express from 'express'
import mongoose from 'mongoose';
import { ProductManager } from '../services/db/products/index.js';
import { BadRequestError, ApiResponse } from '../utils/index.js'
import Product from '../services/db/products/Product-Class.js'
import { uploader } from '../utils/utils.js';
import moment from 'moment'

const productsRoutes = express.Router();
mongoose.connect('mongodb://localhost:27017/ecommerce')
if (mongoose) {
    console.log('conectado')
}
const productManager = new ProductManager()

productsRoutes.get('/', async (req, res) => {
    try {
        const products = await productManager.getAllProductList()
        return ApiResponse.success(res, products)
    } catch (error) {
        return ApiResponse.error(res, error)
    }
})

productsRoutes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            throw new BadRequestError(`El id debe ser numerico`)
        }
        const product = await productManager.getProductById(id);
        if (!product) {
            throw new BadRequestError("El producto no existe")
        }
        return ApiResponse.success(res, product)
    } catch (error) {
        return ApiResponse.error(res, error)
    }
})

productsRoutes.post('/', uploader.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }]), async (req, res) => {
    try {
        const { title, shortdescription, description, stock, price, pcode, category, img1, img2 } = req.body
        const newProduct = new Product(title, shortdescription, description, stock, price, pcode, category, img1, img2)
        newProduct.img1 = req.files['img1'] ? 'up/' + req.files['img1'][0].filename : null;
        newProduct.img2 = req.files['img2'] ? 'up/' + req.files['img2'][0].filename : null;
        newProduct.fecharegistro = moment().format()
        const product = await productManager.addNewProduct(newProduct)
        return ApiResponse.success(res, product)
    } catch (error) {
        return ApiResponse.error(res, error)
    }
});

productsRoutes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, shortdescription, stock, price, pcode, category } = req.body
        const newProduct = new Product(title, description, shortdescription, stock, price, pcode, category)
        const product = await productManager.updateProduct(id, newProduct)
        return ApiResponse.success(res, product)
    } catch (error) {
        return ApiResponse.error(res, error)
    }
})

productsRoutes.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productManager.deleteProduct(id)
        return ApiResponse.success(res, 'Producto Borrado')
    } catch (error) {
        return ApiResponse.error(res, error)
    }
});

export { productsRoutes }