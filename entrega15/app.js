import express from 'express';
import cors from 'cors'
import { productsRoutes } from './src/routes/index.js'
import { userRoutes } from './src/routes/users.router.js'
import { cartRoutes } from './src/routes/cart.router.js'

import { __dirname } from './src/dirname.js';



const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public/`));

app.use('/api/products', productsRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)
//app.use('/api/products', userRoutes)


app.listen(4000, () => {
    console.log('Server on port', 4000)

})