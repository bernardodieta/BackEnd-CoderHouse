import { userService, productService } from '../services/services.js'
import Product from '../services/dto/productsClass.js'
import moment from 'moment'
import { catchedAsync } from "../utils/catchedAsync.js";
import { ConflictError, FavoriteError, NotFoundError, ServerError } from '../utils/errors.js';
import { response } from "../utils/response.js";


const getListProducts = async (req, res) => {
    const { limit = 15, page = 1, sort, category, stock, startDate, endDate } = req.query;
    let filter = {};
    let sortOption = {};
    if (category) {
        filter.category = category;
    }
    if (stock) {
        filter.stock = parseInt(stock);
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

    if (products) {
        response(res, 200, result)
    } else {
        req.logger.warning(`${req.method} en ${req.url} - Error:'No se encontrar productos para mostrar.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontrar productos para mostrar.')
    }

}

const toggleFavorite = async (req, res) => {
    const { _id } = req.user
    const { productId } = req.params;
    const user = await userService.userById(_id);
    const isFavorite = user.favProducts.some(product => product.productId.toString() === productId);
    const filter = { _id: _id };
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
    if (result) {
        response(res, 200, result)
    } else {
        req.logger.error(`${req.method} en ${req.url} - Error:'No se pudo agregar el producto a favoritos' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new FavoriteError('No se pudo agregar el producto a favoritos')
    }
};

const saveProductController = async (req, res) => {
    try {
        let img = []
        const { title, description, stock, price, pcode, category } = req.body;
        const exists = await productService.getProductByPcode(pcode);
        if (exists) {
            req.logger.warning(`${req.method} en ${req.url} - Error: Ya existe un producto con ese Product code - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new ConflictError('Ya existe un producto con ese Product code')
        }
        img = req.files.map(file => ({ path: file.path }));
        const product = new Product(title, description, stock, price, pcode, category, moment().format(), img);
        const newProduct = await productService.saveProduct(product);
        response(res, 201, newProduct)
    } catch (error) {
        req.logger.error(`${req.method} en ${req.url} - Error: ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new ServerError('Ocurrio un error al guardar el producto')
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const product = await productService.getProductById(id)
    if (!product) {
        req.logger.warning(`${req.method} en ${req.url} - Error: No existe un producto con ese id - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No existe un producto con ese id')
    }
    response(res, 201, product)
}

const updateProductById = async (req, res) => {
    const { productId } = req.params
    const { product } = req.body
    const prod = await productService.updateProduct(productId, product)
    if (result) {
        response(res, 201, prod)
    } else {
        req.logger.error(`${req.method} en ${req.url} - Error: ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new ServerError('No se pudo actualizar el producto.')
    }
}


const TuninggetListProducts = catchedAsync(getListProducts);
const TuningrtoggleFavorite = catchedAsync(toggleFavorite);
const TuningsaveProductController = catchedAsync(saveProductController);
const TuninggetProductById = catchedAsync(getProductById);
const TuningupdateProductById = catchedAsync(updateProductById);

export {
    TuninggetListProducts as getListProducts,
    TuningrtoggleFavorite as toggleFavorite,
    TuningsaveProductController as saveProductController,
    TuninggetProductById as getProductById,
    TuningupdateProductById as updateProductById
};

