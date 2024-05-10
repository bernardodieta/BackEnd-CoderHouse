import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/errors.enums.js";
import { generateProductErrorInfoESP } from "../services/errors/messages/product.creation.error.message.js";
import { generateProduct } from "../utils.js";


const products = []
export const generatePro = async (req, res) => {
    try {
        let product = []
        for (let i = 0; i < 100; i++) {
            product.push(generateProduct())
        }
        res.send({ status: 'success', payload: product })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error, message: 'no se pudieron obtener los productos' })

    }
}

export const getProducts = (req, res) => {
    try {
        res.send({ message: "Success", payload: products })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error, message: 'no se pudo obtener los productos.' })
    }
}


export const saveProducts = (req, res) => {
    const { title, price, stock, image, id } = req.body

    if (!title || !price) {
        CustomError.createError({
            name: "Product Creation error",
            cause: generateProductErrorInfoESP({ title, price }),
            message: 'Error tratando de crear un producto',
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    const productDto = {
        title,
        price,
        stock,
        image
    }
    if (products.length === 0) {
        productDto.id = 1
    } else {
        productDto.id = products[products.length - 1].id + 1
    }
    products.push(productDto)
    res.status(201).send({ status: "Success", payload: productDto })
}