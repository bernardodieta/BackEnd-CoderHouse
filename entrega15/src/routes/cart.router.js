import express from 'express'
import mongoose from 'mongoose';
import CartService from '../services/db/cart/cartServices.js';
import { BadRequestError, ApiResponse } from '../utils/index.js'
import moment from 'moment'

const cartRoutes = express.Router();

mongoose.connect('mongodb://localhost:27017/ecommerce')
if (mongoose) {
    console.log('conectado')
}

const cartService = new CartService()

cartRoutes.get('/', async (req, res) => {
    try {
        const carts = await cartService.getAllCart()
        return ApiResponse.success(res, carts)
    } catch (error) {
        return ApiResponse.error(res, error)
    }
})
cartRoutes.post('/', async (req, res) => {
    try {
        const carts = await cartService.createNewCart()
        return ApiResponse.success(res, carts)
    } catch (error) {
        return ApiResponse.error(res, error)
    }
})

cartRoutes.put("/:id/products/:pid", async (req, res) => {
    try {
        const { id, pid } = req.params
        const regProduct = await cartService.addProductToCart(id, pid)
        console.log(req.params)
        res.send({ regProduct })

    } catch (error) {
        res.status(500).send({ error: error, message: "No se pudo agregar el producto al Carrito." });

    }
})



export { cartRoutes }