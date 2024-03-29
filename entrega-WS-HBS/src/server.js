import express from 'express';
import handlebars from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';

import viewRouter from './Routes/views.router.js';
import ProductManager from './Products/productManager.js';
import __dirname from './utils.js';

const server = express();
const PORT = 9080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

server.use(express.static(__dirname + '/public/'));
server.use('/', viewRouter);

const productManager = new ProductManager();

const httpServer = createServer(server);
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    try {
        console.log('Nuevo Cliente conectado...');
        const productList = await productManager.getAllProducts();
        socket.emit('productList', productList);

        socket.on('deleteProduct', async product => {
            const result = await productManager.deleteProduct(product);
            const deleteProduct = await productManager.getAllProducts();
            socketServer.emit('productList', deleteProduct);
        });

        socket.on('newProduct', async (product, callback) => {
            try {
                const result = await productManager.addProduct(product);
                if (result.success) {
                    const updatedProductList = await productManager.getAllProducts();
                    socketServer.emit('productList', updatedProductList);
                }
                if (typeof callback === 'function') {
                    callback(result.message); 
                }
            } catch (error) {
                console.error('Error al agregar producto:', error);
                if (typeof callback === 'function') {
                    callback('Error al agregar producto');
                }
            }
        });
    } catch (error) {
        console.error('Error en la conexión del socket:', error);
    }
});

httpServer.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
});