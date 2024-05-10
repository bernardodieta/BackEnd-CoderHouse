import { Router } from "express";
import { generatePro, saveProducts } from '../controllers/products.controller.js'
import errorHandler from '../services/errors/middlewares/index.js'


const router = Router()

router.get('/', generatePro)
router.post('/', saveProducts)
router.use(errorHandler)
export default router