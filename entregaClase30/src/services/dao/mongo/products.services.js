import { productModel } from "./models/products.model.js"

export default class ProductServicesDao {
    constructor() {

    }

    getAllProducts = async (filter, options) => {
        const products = await productModel.paginate(filter, options)
        return products
    }
    getProductByPcode = async (pcode) => {
        const result = await productModel.findOne({ pcode })
        return result
    }

    saveProduct = async (product) => {
        const newProduct = await productModel.create(product)
        return newProduct;

    }
    getProductById = async (id) => {
        const productFind = await productModel.findById(id)
        return productFind
    }
    updateProductStock = async (id, newStock) => {
        const updatedProduct = await productModel.findByIdAndUpdate(id, { $set: { stock: newStock } }, { new: true });
        return updatedProduct;
    }


    updateProduct = async (productId, product) => {
        const options = { new: true };
        const result = await productModel.findByIdAndUpdate(productId, product, options);
        return result;
    };
}