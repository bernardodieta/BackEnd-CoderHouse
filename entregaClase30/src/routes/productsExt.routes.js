import CustomRouter from "./customs.routes.js";
import { getListProducts, saveProductController, getProductById, toggleFavorite, updateProductById } from '../controllers/products.controllers.js'
import { upload } from '../utils.js'

export class ProductsExtRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            const result = await getListProducts(req)
            res.sendSuccess(result)

        })
        this.post('/favoritos/:userId/:productId', ['USER'], async (req, res) => {
            const result = await toggleFavorite(req, res)
            if (result) {
                res.sendSuccess({ message: 'Producto agregado a favoritos', result })
            } else {
                res.sendClientError(result)
            }
        });

        this.post('/register', ['ADMIN'], upload.array('img', 4), async (req, res) => {
            const result = await saveProductController(req);
            res.sendSuccess({
                message: 'Producto Creado',
                data: result
            });
        });

        this.get('/:id', ['PUBLIC'], async (req, res) => {
            try {
                const result = await getProductById(req)
                res.sendSuccess({
                    message: 'Producto Encontrado:',
                    data: result
                });
            } catch (error) {
                res.sendClientError(result)
            }
        })

        this.put('/edit/:productId', ['USER'], async (req, res) => {
            try {
                const result = await updateProductById(req, res)
                res.sendSuccess({ message: 'Producto Actualizado Correctamente', result })
            } catch (error) {
                res.sendClientError(error)
            }
        })


    }
}