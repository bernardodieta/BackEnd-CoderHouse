import mongoose from "mongoose";

const productCollection = "products"

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const productSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    shortdescription: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    stock: stringTypeSchemaNonUniqueRequired,
    price: stringTypeSchemaNonUniqueRequired,
    pcode: stringTypeSchemaUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired,
    img1: stringTypeSchemaNonUniqueRequired,
    img2: stringTypeSchemaNonUniqueRequired,
    fecharegistro: stringTypeSchemaNonUniqueRequired,
    carts: { type: [{ cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" } }] }

})

export const productModel = mongoose.model(productCollection, productSchema)