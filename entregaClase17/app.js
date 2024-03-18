import express from 'express';
import cors from 'cors';
import { productsRoutes } from './src/routes/products.router.js';
import { userRoutes } from './src/routes/users.router.js';
import { cartRoutes } from './src/routes/cart.router.js';
import { viewsProductsRouter } from './src/routes/productsViews.router.js';
import { viewsCartRouter } from './src/routes/cartViewsRouter.js'
import handlebars from "express-handlebars";
import { __dirname } from './src/dirname.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/products', viewsProductsRouter);
app.use('/cart', viewsCartRouter);

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configuración para servir archivos estáticos
app.use(express.static(__dirname + "/public"));

// Escucha del servidor
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
});
