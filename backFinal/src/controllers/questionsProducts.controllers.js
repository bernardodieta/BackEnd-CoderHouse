import { questionService } from "../services/services.js"
import { catchedAsync } from "../utils/catchedAsync.js"
import { response } from '../utils/response.js'

const saveQuestionProduct = async (req, res, next) => {
    try {
        const { productId } = req.params
        const { question } = req.body
        const { userId } = req.user
        const result = await questionService.saveQuestion(productId, question, userId)
        
        response(res, 200, result)
    } catch (error) {
        next(error)
    }


}

const TuningSaveQuestionProduct = catchedAsync(saveQuestionProduct)

export {
    TuningSaveQuestionProduct as saveQuestionProduct
}