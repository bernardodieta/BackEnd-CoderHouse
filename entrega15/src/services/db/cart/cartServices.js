import { cartModel } from "../models/cart.model.js";
import { BadRequestError, NotFoundError } from "../../../utils/index.js";
import moment from 'moment'

export default class CartService {
    constructor() {

    }
    getAllCart = async () => {
        let carts = await cartModel.find().populate('products.product')
        return carts
    }

    createNewCart = async () => {
        const product = [];
        const newEmptyCart = await cartModel.create({ product })
        return newEmptyCart
    }

    addProductToCart = async (_cid, _pid) => {
        console.log('addProduct')
        const addProduct = await cartModel.updateOne(
            { _id: _cid },
            { $push: { products: { product: _pid } } },
            { new: true }
        )
        
        return addProduct
    }
}