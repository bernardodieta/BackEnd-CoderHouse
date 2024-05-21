import { ClientError, ValidationError } from "../../utils/errors.js";
import mongoose from "mongoose";

export const validateName = (req, res, next) => {
    const { addressData } = req.body;
    const { country, state, city, zipcode, addressText, numext } = addressData;

    if (country && !/^[a-zA-Z\s]+$/.test(country)) {
        throw new ClientError('Nombre de país inválido.');
    }

    if (state && !/^[a-zA-Z\s]+$/.test(state)) {
        throw new ClientError('Nombre de estado inválido.');
    }

    if (city && !/^[a-zA-Z\s]+$/.test(city)) {
        throw new ClientError('Nombre de ciudad inválido.');
    }

    if (zipcode && !/^\d{5}$/.test(zipcode)) {
        throw new ClientError('Código postal inválido. Debe contener 5 dígitos.');
    }
    if (addressText && !/^[\w\s,.#-]+$/.test(addressText)) {
        throw new ClientError('Texto de dirección inválido.');
    }

    if (numext && !/^\d+$/.test(numext)) {
        throw new ClientError('Número exterior inválido. Debe ser numérico.');
    }

    next();
}

export const validateQuantity = (req, res, next) => {
    let getQuantity = 0
    if (!req.body.quantity) {
        getQuantity = req.params
    } else {
        getQuantity = req.body
    }
    if (!getQuantity) throw new ClientError('Cantidad Invalida, ingrese una cantidad.')
    if (getQuantity && getQuantity <= 0) throw new ClientError('Cantidad Invalida, ingrese una cantidad mayor a cero')
    next()
}


export const validateProductRegister = (req, res, next) => {
    const { title, description, stock, price, pcode, category } = req.body;
    if (!title || !description || !stock || !price || !pcode || !category) {
        throw new ValidationError("Faltan campos requeridos.");
    }
    if (req.files && req.files.length < 0) {
        throw new ValidationError("Faltan campos requeridos.");
    }
    next()
}