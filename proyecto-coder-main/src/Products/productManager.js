import fs from 'fs';
import Product from './productClass.js';

class ProductManager {
    products;
    productFileName;
    productDirName;
    filesystem;
    constructor() {
        this.products = new Array();
        this.filesystem = fs;
        this.productDirName = './src/data/';
        this.productFileName = this.productDirName + '/productData.json'
    }

    getAllProducts = async (limit) => {
        const getProducts = await fs.promises.readFile(this.productFileName, 'utf-8');
        const parseList = JSON.parse(getProducts)
        limit = Number(limit)
        if (limit) {
            const nuevo = parseList.slice(0, limit)
            return { success: true, message: 'Estos son los productos por pagina que pidio.', nuevo };
        } else {
            const nuevo = parseList
            return nuevo;
        }
    }

    getProductById = async (pid) => {
        pid = Number(pid)
        const getProduct = await fs.promises.readFile(this.productFileName, 'utf-8');
        const parseList = JSON.parse(getProduct)
        const product = parseList.find(product => product.id === pid);
        if (product) {
            return { success: true, message: 'Producto encontrado', product }
        } else {
            return { success: false, message: 'Producto no encontrado' }
        }
    }

    addProduct = async (product) => {
        const { title, description, code, price, status, stock, category, thumbnails } = product
        const newProduct = new Product(title, description, code, price, status, stock, category, thumbnails)
        await this.filesystem.promises.mkdir(this.productDirName, { recursive: true });
        const allData = await this.getAllProducts()
        const result = await this.saveProduct(allData, newProduct)
        if (!result) {
            return { success: false, message: "Error al guardar el producto." }
        }
        return { success: true, message: "Producto agregado Correctamente" }
    }

    saveProduct = async (allData, newProduct) => {
        try {
            const getCode = allData.find((p) => p.code === newProduct.code);
            if (getCode) {
                return { success: false, message: "Producto Duplicado:" };
            }
            if (newProduct.id === undefined) {
                let newId;
                do {
                    newId = Math.floor(Math.random() * 1000000);
                } while (allData.find((p) => p.id === newId))
                newProduct.id = newId
            }
            this.products.push(...allData, newProduct)
            await this.filesystem.promises.writeFile(this.productFileName, JSON.stringify(this.products, null, 2, '\t'))
            return newProduct, { success: true, message: 'Producto guardado correctamente.' };

        } catch (error) {
            return { success: false, message: `Error al guardar el producto: ${error.message}` };
        }
    }

    updateProduct = async (product) => {
        const { title, description, code, price, status, stock, category, thumbnails, id } = product
        const newProduct = new Product(title, description, code, price, status, stock, category, thumbnails, id)
        try {
            this.parseList = await this.getAllProducts()
            const productIndex = this.parseList.findIndex((p) => p.code === newProduct.code)
            if (productIndex !== -1) {
                let productToUpdate = this.parseList[productIndex];
                for (let key in newProduct) {
                    if (key !== 'id' && productToUpdate[key] !== newProduct[key]) {
                        productToUpdate[key] = newProduct[key];
                    }
                }
            }
            await this.filesystem.promises.writeFile(this.productFileName, JSON.stringify(this.parseList, null, 2, '\t'))
            return { success: true, message: 'Dato Actualizado con exito', newProduct }
        } catch (error) {
            return { success: false, message: `Error al actualizar el producto: ${error.message}` };
        }
    }

    deleteProduct = async (id) => {
        try {
            id = Number(id)
            const parseList = await this.getAllProducts();
            const productIndex = parseList.findIndex((p) => p.id === id)
            if (productIndex === -1) {
                return { success: false, message: 'Producto no encontrado' }
            }
            parseList.splice(productIndex, 1);
            await this.filesystem.promises.writeFile(this.productFileName, JSON.stringify(parseList, null, 2, '\t'))
            return { success: true, message: 'Producto eliminado con éxito' };

        } catch (error) {
            return { success: false, message: `Error al eliminar el producto: ${error.message}` };

        }
    }
}

export default ProductManager;