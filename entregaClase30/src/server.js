import express, { urlencoded } from 'express'
import config from './config/config.js';
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from 'cors'
import { __dirname } from "../utilsdir.js";
import { passportCall } from "./utils.js";
import initializePassport from "./config/passport.config.js";
import { UsersExtRouter } from './routes/usersExt.routes.js'
import { ProductsExtRouter } from './routes/productsExt.routes.js'
import { CartRouter } from './routes/cartsExt.routes.js';
import { SmsAndEmail } from './routes/messageAndEmail.routes.js'
import { OrdersRoutes } from './routes/ordersExt.routes.js';
import { AddressRoutes } from './routes/addressExt.routes.js';
import MongoSingleton from './config/mongodb-singleton.js';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}))
server.use(cookieParser("CoderS3cr3tC0d3"));

initializePassport();
server.use(passport.initialize());
server.use(passportCall("jwt"));

server.use(express.static(__dirname + "/"));
const smsAndEmail = new SmsAndEmail()
const cartRouter = new CartRouter()
const userExtRouter = new UsersExtRouter()
const productsExtRouter = new ProductsExtRouter()
const orderRoutes = new OrdersRoutes()
const addressRoutes = new AddressRoutes()
server.use("/com/", smsAndEmail.getRouter())
server.use("/api/users", userExtRouter.getRouter())
server.use('/api/products', productsExtRouter.getRouter())
server.use('/api/cart', cartRouter.getRouter())
server.use('/api/orders', orderRoutes.getRouter())
server.use('/api/address/', addressRoutes.getRouter())
const SERVER_PORT = config.port;
const MONGO_URL = config.mongoUrl;
console.log('asd', MONGO_URL)
server.listen(SERVER_PORT, () => {
    console.log(__dirname)
    console.log('Server en puerto:', SERVER_PORT);
})


const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
mongoInstance();