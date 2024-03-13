import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { productsRoutes } from './src/routes/index.js';
import { userRoutes } from './src/routes/users.router.js';
import { cartRoutes } from './src/routes/cart.router.js';
import { Messages } from './src/services/db/message/messageServices.js';
import { msgRoutes } from './src/routes/message.router.js'
import handlebars from "express-handlebars";
import { __dirname } from './src/dirname.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', msgRoutes);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})
const socketServer = new Server(httpServer);

const userMessage = [];

socketServer.on('connection', socket => { // Changed 'conexion' to 'connection'
    socketServer.emit('messageLogs', userMessage);
    const serviceMessage = new Messages()
    socket.on('message', data => {
        userMessage.push(data);
        const saveData = serviceMessage.saveMessage(data)
        //console.log(data)
        socketServer.emit('messageLogs', userMessage);
    });

    socket.on('userConnected', data => { // Changed 'userConected' to 'userConnected'
        socket.broadcast.emit('userConnected', data.user);
    });

    socket.on('closeChat', data => {
        if (data.close === 'close') {
            socket.disconnect();
        }
    });
});

