import CustomRouter from "./customs.routes.js";
import { getListProducts, saveProductController, getProductById, toggleFavorite, updateProductById } from '../controllers/products.controllers.js'
import { upload } from '../utils.js'
import { validateProductRegister } from "../services/middlewares/validateName.js";

export class ProductsExtRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], async (req, res, next) => {
            getListProducts(req, res, next)

        })
        this.post('/favoritos/:productId', ['USER'], async (req, res) => {
            toggleFavorite(req, res)
        });

        this.post('/register', ['USER'], upload.array('img', 4), validateProductRegister, async (req, res) => {
            saveProductController(req,res);
        });

        this.get('/:id?', ['PUBLIC'], async (req, res) => {
            getProductById(req, res)
        })

        this.put('/edit/:productId', ['USER'], async (req, res) => {
            updateProductById(req, res)
        })

    }
}