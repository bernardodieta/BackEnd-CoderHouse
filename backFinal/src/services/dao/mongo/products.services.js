import { productModel } from "./models/products.model.js"

export default class ProductServicesDao {
    constructor() {

    }

    getAllProducts = async (filter, options) => {
        try {
            const products = await productModel.paginate(filter, options)
            return products
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener todos los productos.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener todos los productos.')
        }
    }

    getProductByPcode = async (pcode) => {
        try {
            const result = await productModel.findOne({ pcode })
            return result
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener el producto por su Product Code.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener el producto por su Product Code.')
        }

    }

    saveProduct = async (product) => {
        try {
            const newProduct = await productModel.create(product)
            return newProduct;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al guardar el producto.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al guardar el producto.')
        }
    }

    getProductById = async (id) => {
        try {
            const productFind = await productModel.findById(id)
            return productFind
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al actualizar el stock del producto' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener el producto por ID.')
        }

    }
    updateProductStock = async (id, newStock) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, { $set: { stock: newStock } }, { new: true });
            return updatedProduct;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al actualizar el stock del producto' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al actualizar el stock del producto')
        }
    }

    updateProduct = async (productId, product) => {
        try {
            const options = { new: true };
            const result = await productModel.findByIdAndUpdate(productId, product, options);
            return result;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al actualizar producto' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al actualizar producto')
        }
    };
}