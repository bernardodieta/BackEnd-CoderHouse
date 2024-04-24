import CustomRouter from "./customs.routes.js";
import { getListProducts, saveProductController, getProductById } from '../controllers/products.controllers.js'
import { upload } from '../utils.js'

export class ProductsExtRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            const result = await getListProducts(req)
            return res.sendSuccess(result)          

        })

        this.post('/register', ['PUBLIC'], upload.array('img', 4), async (req, res) => {
            const result = await saveProductController(req);
            return res.sendSuccess({
                message: 'Producto Creado',
                data: result
            });
        });

        this.get('/:id', ['PUBLIC'], async (req, res) => {
            try {
                const result = await getProductById(req)
                return res.sendSuccess({
                    message: 'Producto Encontrado:',
                    data: result
                });
            } catch (error) {
                return error
            }
        })


    }
}