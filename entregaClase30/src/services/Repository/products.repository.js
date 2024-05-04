export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
    getAllProducts = async (filter, options) => {
        return this.dao.getAllProducts(filter, options)
    }

    getProductByPcode = async (pcode) => {
        return this.dao.getProductByPcode()
    }

    saveProduct = async (product) => {
        return this.dao.saveProduct(product)
    }
    getProductById = async (id) => {
        return this.dao.getProductById(id)
    }

    updateProductStock = async (id, newStock) => {
        return this.dao.updateProductStock(id, newStock)
    }

    updateProduct = async (productId, product) => {
        return this.dao.updateProduct(productId, product)
    }

}