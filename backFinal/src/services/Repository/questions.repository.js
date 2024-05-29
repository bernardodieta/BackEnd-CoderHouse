export default class QuestionRepository {
    constructor(dao) {
        this.dao = dao
    }

    saveQuestion = async (productId, question, userId,logger) => {
        return this.dao.saveQuestion(productId, question, userId,logger)
    }
}