import CustomRouter from "./customs.routes.js";
import { getListProducts, saveProductController, getProductById, toggleFavorite, updateProductById } from '../controllers/products.controllers.js'
import { upload } from '../utils.js'

export class ProductsExtRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            const result = await getListProducts(req)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)

        })
        this.post('/favoritos/:productId', ['USER'], async (req, res) => {
            const result = await toggleFavorite(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        });

        this.post('/register', ['ADMIN'], upload.array('img', 4), async (req, res) => {
            const result = await saveProductController(req);
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        });

        this.get('/:id?', ['PUBLIC'], async (req, res) => {
            const result = await getProductById(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })

        this.put('/edit/:productId', ['USER'], async (req, res) => {
            const result = await updateProductById(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })

    }
}