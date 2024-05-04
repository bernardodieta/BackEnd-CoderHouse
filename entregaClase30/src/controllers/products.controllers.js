
import { userService, productService } from '../services/services.js'
import Product from './classes/productsClass.js'
import moment from 'moment'

export const getListProducts = async (req, res) => {
    const { limit = 15, page = 1, sort, category, stock, startDate, endDate } = req.query;

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
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        } else if (startDate) {
            filter.createdAt = { $gte: new Date(startDate) };
        } else if (endDate) {
            filter.createdAt = { $lte: new Date(endDate) };
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

        const products = await productService.getAllProducts(filter, options);
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

export const toggleFavorite = async (req, res) => {
    const { productId, userId } = req.params;

    try {
        const user = await userService.userById(userId);
        const isFavorite = user.favProducts.some(product => product.productId.toString() === productId);
        const filter = { _id: userId };
        let update;

        if (isFavorite) {
            update = {
                $pull: {
                    "favProducts": { productId: productId }
                }
            };
        } else {
            update = {
                $addToSet: {
                    "favProducts": { productId: productId }
                }
            };
        }
        const result = await userService.updateInfo(filter, update);
        result.password = ''
        return result;
    } catch (error) {
        return ({ status: 'error', message: 'Error al actualizar favoritos', error });
    }
};

export const saveProductController = async (req) => {
    const { title, description, stock, price, pcode, category } = req.body
    let img = [];

    if (req.files && req.files.length > 0) {
        img = req.files.map(file => ({ path: file.path }));
    } else {
        console.log('No se subio niguna imagen. Desactivado el required para pruebas en Postman');
    }

    const exists = await productService.getProductByPcode(pcode);
    if (exists) {
        return { error: 'El producto ya existe', payload: exists };
    }
    const product = new Product(title, description, stock, price, pcode, category, moment().format(), img);

    try {
        const newProduct = await productService.saveProduct(product);
        return { newProduct };
    } catch (error) {
        console.error('Error saving product:', error);
        return { error: 'Error al guardar el producto' };
    }
}

export const getProductById = async (req) => {
    const { id } = req.params
    console.log(id)
    const product = await productService.getProductById(id)
    if (!product) {
        return { error: 'No existe un producto con ese ID' }
    }
    return product
}
export const updateProductById = async (req, res) => {
    try {
        const { productId } = req.params
        const { product } = req.body
        const prod = await productService.updateProduct(productId, product)
        return prod
    } catch (error) {
        return error
    }


}