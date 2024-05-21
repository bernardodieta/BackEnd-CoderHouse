import { DatabaseError } from '../../../utils/errors.js'
import addressModel from './models/address.models.js'
export default class AddressServicesDao {
    constructor() {
    }
    getFullAddress = async (userId) => {
        try {
            const result = await addressModel.find({ userId: userId })
            return result
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al intentar obtener todas las direcciones.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al intentar obtener todas las direcciones.')
        }
    }
    saveAddress = async (addressData) => {
        try {
            const result = await addressModel.create(addressData)
            return result
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al guardar la direccion.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al guardar la direccion.')
        }

    }
}