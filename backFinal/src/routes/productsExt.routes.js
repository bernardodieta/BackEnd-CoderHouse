import CustomRouter from "./customs.routes.js";
import { saveQuestionProduct } from '../controllers/questionsProducts.controllers.js'
import { validateDataProduct, validateEmptyProductRegister } from "../services/middlewares/validateDataProduct.js";
import { getListProducts, saveProductController, getProductById, toggleFavorite, updateProductById, deletProductById } from '../controllers/products.controllers.js'
import { upload } from '../utils.js'

export class ProductsExtRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getListProducts)

        this.post('/favoritos/:productId', ['USER','ADMIN'], toggleFavorite);

        this.post('/register', ['USER', 'PREMIUM','ADMIN'], validateDataProduct, upload.array('files', 4), saveProductController);

        this.get('/:id?', ['PUBLIC'], getProductById)

        this.put('/edit/:productId', ['PUBLIC','ADMIN'], updateProductById)

        this.delete('/:id?', ['PREMIUM', 'ADMIN','ADMIN'], deletProductById)

        this.post('/question/:productId', ['USER','ADMIN'], saveQuestionProduct)

    }
}