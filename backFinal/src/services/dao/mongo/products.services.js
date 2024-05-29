import { productModel } from "./models/products.model.js"
import { DatabaseError, NotFoundError } from "../../../utils/errors.js"
export default class ProductServicesDao {
    constructor() {

    }

    getAllProducts = async (filter, options, logger) => {
        const products = await productModel.paginate(filter, options)
        if (!products) {
            logger.error(`Error al obtener todos los productos.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener todos los productos.')
        }
        return products
    }

    getProductByPcode = async (pcode, logger) => {
        const result = await productModel.findOne({ pcode })
        console.log('result', result)
        return result
    }

    saveProduct = async (product, logger) => {
        const newProduct = await productModel.create(product)
        if (!newProduct) {
            logger.error(`Error al guardar el producto.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al guardar el producto.')
        }
        return newProduct;
    }

    getProductById = async (id, logger) => {
        const productFind = await productModel.findById(id)
        if (!productFind) {
            logger.error(`Error al actualizar el stock del producto' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener el producto por ID.')
        }
        return productFind
    }

    updateProductStock = async (id, newStock, logger) => {
        const updatedProduct = await productModel.findByIdAndUpdate(id, { $set: { stock: newStock } }, { new: true });
        if (!updatedProduct) {
            logger.error(`Error al actualizar el stock del producto' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al actualizar el stock del producto')
        }
        return updatedProduct;
    }

    delProduct = async (_id, logger) => {
        const deletedProduct = await productModel.deleteOne({ _id: _id })
        if (!deletedProduct) {
            logger.error(`Error al borrar el producto' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al borrar el producto')
        }
        return deletedProduct
    }

    updateProduct = async (productId, product, logger) => {
        const options = { new: true };
        const result = await productModel.findByIdAndUpdate(productId, product, options);
        if (!result) {
            logger.error(`Error al actualizar producto' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al actualizar producto')
        }
        return result;
    };
}