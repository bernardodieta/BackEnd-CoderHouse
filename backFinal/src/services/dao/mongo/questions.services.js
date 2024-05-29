import { DatabaseError, NotFoundError } from "../../../utils/errors.js"
import { productModel } from "./models/products.model.js"
import questionModel from "./models/questionProduct.models.js"
import userModel from "./models/users.model.js"

export default class QuestionProductDao {
    constructor() { }
    saveQuestion = async (productId, question, userId) => {
        const newQuestion = new questionModel({
            content: question,
            user: userId,
            product: productId
        })
        const result = questionModel.save()
        if (!result) {
            logger.warning(`Ocurrio un error al intentar guardar la pregunta' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Ocurrio un error al intentar guardar la pregunta')
        }

        const product = await productModel.findById(productId)
        if (!product) {
            logger.warning(`No se encontro un producto con ese ID' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError('No se encontro un producto con ese ID')
        }

        product.questions.push(newQuestion)
        const productSave = await productModel.save()
        if (!productSave) {
            logger.error(`Ocurrio un error al intentar guardar la pregunta en el producto' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Ocurrio un error al intentar guardar la pregunta en el producto')
        }

        const user = await userModel.findById(userId);
        if (!user) {
            logger.warning(`No se encontro un usuario con ese ID' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError('No se encontro un usuario con ese ID')
        }

        user.questions.push(newQuestion)
        const saveUser = await userModel.save()
        if (!saveUser) {
            logger.error(`Ocurrio un error al intentar actualizar el usuario con los datos' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Ocurrio un error al intentar actualizar el usuario con los datos')
        }
        
        return newQuestion
    }
}