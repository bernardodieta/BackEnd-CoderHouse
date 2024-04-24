import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = "products";

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
    description: stringTypeSchemaNonUniqueRequired,
    stock: stringTypeSchemaNonUniqueRequired,
    price: stringTypeSchemaNonUniqueRequired,
    pcode: stringTypeSchemaUniqueRequired,
    category: String,      
    fecharegistro: String,
    img: Array,  
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
