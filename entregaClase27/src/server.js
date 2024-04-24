import express, { urlencoded } from 'express'
import config from './config/config.js';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from 'cors'
import { __dirname } from "../utilsdir.js";
import { passportCall } from "./utils.js";
import initializePassport from "./config/passport.config.js";
import { UsersExtRouter } from './routes/usersExt.routes.js'
import { ProductsExtRouter } from './routes/productsExt.routes.js'
import { CartRouter } from './routes/cartsExt.routes.js';

const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500', 'http://localhost:3000'] ,
    credentials: true,
    optionsSuccessStatus: 200
}))
server.use(cookieParser("CoderS3cr3tC0d3"));

initializePassport();
server.use(passport.initialize());
server.use(passportCall("jwt"));

server.use(express.static(__dirname + "/"));

const cartRouter = new CartRouter()
const userExtRouter = new UsersExtRouter()
const productsExtRouter = new ProductsExtRouter()

server.use("/api/users", userExtRouter.getRouter())
server.use('/api/products', productsExtRouter.getRouter())
server.use('/api/cart', cartRouter.getRouter())
const SERVER_PORT = config.port;

server.listen(SERVER_PORT, () => {
    console.log(__dirname)
    console.log('Server en puerto:', SERVER_PORT);
})


const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/colegio?retryWrites=true&w=majority"
        );
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();