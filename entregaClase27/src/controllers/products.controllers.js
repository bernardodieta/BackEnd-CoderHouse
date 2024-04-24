import ProductServices from '../services/dao/mongo/products.services.js'
import Product from './classes/productsClass.js'
import moment from 'moment'

const productServices = new ProductServices()

export const getListProducts = async (req, res) => {
    const { limit = 10, page = 1, sort, category, stock } = req.query;

    try {
        let filter = {};
        let sortOption = {};
        
        if (category) {
            filter.category = category;
            console.log('Filtering by category:', category);
        }
        if (stock) {
            filter.stock = parseInt(stock);
            console.log('Filtering by stock:', stock);
        }

        if (sort === 'asc' || sort === 'desc') {
            sortOption.price = sort === 'asc' ? 1 : -1;
        }

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sortOption,
            lean: true
        };

        const products = await productServices.getAllProducts(filter, options);
        const totalPages = products.totalPages;
        const hasNextPage = products.hasNextPage;
        const hasPrevPage = products.hasPrevPage;
        const prevPage = hasPrevPage ? parseInt(page) - 1 : null;
        const nextPage = hasNextPage ? parseInt(page) + 1 : null;
        const prevLink = hasPrevPage ? `/?page=${prevPage}&limit=${limit}&sort=${sort}&category=${category}&stock=${stock}` : null;
        const nextLink = hasNextPage ? `/?page=${nextPage}&limit=${limit}&sort=${sort}&category=${category}&stock=${stock}` : null;

        const result = {
            data: products.docs,
            totalPages,
            prevPage,
            nextPage,
            page: parseInt(page),
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };

        return result;
    } catch (error) {
        console.error('Error fetching product list:', error);
        return (error);
    }
}


export const saveProductController = async (req) => {
    const { title, description, stock, price, pcode, category } = req.body
    let img = [];

    if (req.files && req.files.length > 0) {
        img = req.files.map(file => ({ path: file.path }));
    } else {
        console.log('No se subio niguna imagen. Desactivado el required para pruebas en Postman');
    }

    const exists = await productServices.getProductByPcode(pcode);
    if (exists) {
        return { error: 'El producto ya existe', payload: exists };
    }
    const product = new Product(title, description, stock, price, pcode, category, moment().format(), img);

    try {
        const newProduct = await productServices.saveProduct(product);
        return { newProduct };
    } catch (error) {
        console.error('Error saving product:', error);
        return { error: 'Error al guardar el producto' };
    }
}
export const getProductById = async (req) => {
    const { id } = req.params
    console.log(id)
    const product = await productServices.getProductById(id)
    if (!product) {
        return { error: 'No existe un producto con ese ID' }
    }
    return product
}
