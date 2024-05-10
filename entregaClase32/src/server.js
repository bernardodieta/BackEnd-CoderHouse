import express, { urlencoded } from 'express'
import productsRoutes from './routes/productsRoutes.js'


const server = express()

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.use('/mockingproducts', productsRoutes)

server.listen(8080, () => {
    console.log('escuchando puerto 8080')
})