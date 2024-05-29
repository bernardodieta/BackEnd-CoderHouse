import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionProductCollection = "questionProducts";

const questionProductSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        require: true

    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

const questionModel = mongoose.model(questionProductCollection, questionProductSchema)
export default questionModel;