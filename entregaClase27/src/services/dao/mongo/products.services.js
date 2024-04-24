import { productModel } from "./models/products.model.js"

export default class ProductServices {
    constructor() {

    }

    getAllProducts = async (filter, options) => {
        const products = await productModel.paginate(filter, options)
        return products
    }
    getProductByPcode = async (pcode) => {

        const result = await productModel.findOne({pcode})
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
}