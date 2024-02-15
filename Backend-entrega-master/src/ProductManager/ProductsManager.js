import fs from 'fs';
import Product from './ProductClass.js';

class ProductsManager {
    products;
    productFileName;
    productDirName;
    filesystem;


    constructor() {
        this.products = new Array();
        this.productDirName = './src/data/';
        this.productFileName = this.productDirName + '/productData.json'
        this.filesystem = fs;

    }
    addProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock } = product
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return { success: false, message: 'Debe ingresar todos los datos' }
        }
        const newProduct = new Product(title, description, price, thumbnail, code, stock)
        const dirExist = this.filesystem.existsSync(this.productDirName);
        const mkDir = await this.filesystem.promises.mkdir(this.productDirName, { recursive: true })

        try {
            const parseList = await this.getProductList2();

            await this.validateDirandFile(dirExist, mkDir)
            await this.getProductList2()
            const result = await this.saveProduct(parseList, newProduct)
            return result;
        } catch (error) {

            return { success: false, message: `Error al agregar el producto: ${error.message}` };
        }
    }
    validateDirandFile = async (dirExist, mkDir) => {
        dirExist ? console.log('El directorio ya existe.') : console.log(`Directorio Creado en: ${mkDir}`)
        if (!this.filesystem.existsSync(this.productFileName)) {
            await this.filesystem.promises.writeFile(this.productFileName, "[]");
        }
    }
    saveProduct = async (parseList, newProduct) => {
        try {          
            const getCode = parseList.find((p) => p.code === newProduct.code);
            if (getCode) {
                return { success: false, message: `Producto Duplicado:` };
            }
            if (newProduct.id === undefined) {
                let newId;
                do {
                    newId = Math.floor(Math.random() * 1000000);
                } while (parseList.find((p) => p.id === newId))
                newProduct.id = newId
            }
            this.products.push(...parseList, newProduct)
            await this.filesystem.promises.writeFile(this.productFileName, JSON.stringify(this.products, null, 2, '\t'))
            return newProduct, { success: true, message: 'Producto guardado correctamente.' };

        } catch (error) {
            return { success: false, message: `Error al guardar el producto: ${error.message}` };
        }
    }
    updateProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock } = product
        const newProduct = new Product(title, description, price, thumbnail, code, stock)
        try {
            this.parseList = await this.getProductList2()
            const upProductIndex = this.parseList.findIndex((p) => p.code === newProduct.code)
            if (upProductIndex !== -1) {
                Object.entries(newProduct).forEach(([key, value]) => {
                    if (this.parseList[upProductIndex][key] !== value) {
                        this.parseList[upProductIndex][key] = value;
                    }
                });
            }

            console.log(this.parseList[upProductIndex])
            await this.filesystem.promises.writeFile(this.productFileName, JSON.stringify(this.parseList, null, 2, '\t'))
            return { success: true, message: 'Dato Actualizado con exito', newProduct }
        } catch (error) {
            return { success: false, message: `Error al actualizar el producto: ${error.message}` };
        }
    }

    deleteProduct = async (id) => {
        try {
            id = Number(id)
            this.parseList = await this.getProductList2();
            const productIndex = this.parseList.findIndex((p) => p.id === id)
            if (productIndex === -1) {
                return { success: false, message: 'Producto no encontrado' }
            }
            this.parseList.splice(productIndex, 1);
            await this.filesystem.promises.writeFile(this.productFileName, JSON.stringify(this.parseList, null, 2, '\t'))
            return { success: true, message: 'Producto eliminado con éxito' };

        } catch (error) {
            return { success: false, message: `Error al eliminar el producto: ${error.message}` };

        }
    }
    getProductList2 = async () => {
        try {
            const productList = await this.filesystem.promises.readFile(this.productFileName, 'utf-8')
            const parseList = JSON.parse(productList)
            return parseList;
        } catch (error) {
            return { success: false, message: 'Error al intentar obtener la lista de productos' };
        }
    }


    getProductList = async (limit) => {
        const productList = await this.filesystem.promises.readFile(this.productFileName, 'utf-8')
        const parseList = JSON.parse(productList)
        limit = Number(limit)
        try {
            if (limit) {
                const nuevo = parseList.slice(0, limit)
                return { success: true, message: 'Estos son los productos por pagina que pidio.', nuevo };
            } else {
                const nuevo = parseList
                return { success: true, message: 'Como no se definio un limite muestro todos los productos', nuevo };
            }
        } catch (error) {
            return { success: false, message: 'error' };
        }
    }
    getProductById = async (id) => {
        try {
            id = Number(id);
            console.log(id)
            this.parseList = await this.getProductList();
            const productIndex = this.parseList.find((p) => p.id === id)
            if (!productIndex) {
                return { success: false, message: 'No hay productos con ese id' }
            }
            return { success: true, message: 'Producto Encontrado', productIndex }
        } catch (error) {
            return { success: false, message: `Error al buscar el producto: ${error.message}` };

        }
    }
}

export default ProductsManager