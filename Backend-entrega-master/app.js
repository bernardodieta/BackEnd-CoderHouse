import express from "express";
import ProductsManager from './src/ProductManager/ProductsManager.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const productsManager = new ProductsManager();

app.get('/productslimit/:limit?', async (req, res) => {
    const limit = req.params.limit
    let result;
    if (limit) {
        result = await productsManager.getProductList(limit)
    } else {
        result = await productsManager.getProductList()
    }
    result.success ? res.status(200).json(result) : res.status(400).json(result)
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id
    const result = await productsManager.getProductById(id)
    result.success ? res.status(200).json(result) : res.status(400).json(result)

})

app.delete('/delproduct/:id', async (req, res) => {
    const id = req.params.id;
    const result = await productsManager.deleteProduct(id)
    result.success ? res.status(200).json(result) : res.status(400).json(result);

})
app.post('/addproduct', async (req, res) => {
    const product = req.body;
    const result = await productsManager.addProduct(product)
    result.success ? res.status(200).json(result) : res.status(400).json(result);

})
app.put('/updateproduct', async (req, res) => {
    const product = req.body
    const result = await productsManager.updateProduct(product)
    result.success ? res.status(200).json(result) : res.status(400).json(result);

})

app.listen(3000, () => {
    console.log('Server on port', 3000)

})