import mongoose from "mongoose";

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    products: { type: Array, default: [] }
})

const cartModel = mongoose.model(collectionName, cartSchema)
export { cartSchema, cartModel }