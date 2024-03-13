import mongoose from 'mongoose'
const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    user: String,
    area: String,
    email: String,
})

export const messageModel = mongoose.model(messageCollection, messageSchema) 