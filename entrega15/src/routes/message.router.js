import express from 'express'
import mongoose from 'mongoose'
import { Messages } from '../services/db/message/messageServices.js'

mongoose.connect('mongodb://localhost:27017/ecommerce')
if (mongoose) {
    console.log('conectado')
}

const messageService = new Messages()
const msgRoutes = express.Router()


msgRoutes.get("/message", async (req, res) => {
    res.render("messages");
});

msgRoutes.post("/message", async (req, res) => {
    const msg = req.body;
    const saveMsg = await messageService.saveMessage(msg)
    console.log(saveMsg)
    res.render("messages");
});


export { msgRoutes }