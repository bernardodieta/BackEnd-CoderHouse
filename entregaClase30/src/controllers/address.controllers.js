import { addressService } from "../services/services.js"

export const saveAddressController = async (req, res) => {
    try {
        const { _id } = req.user
        const { addressData } = req.body
        addressData.userId = _id
        console.log('addres antes:', addressData)
        const result = await addressService.saveAddress(addressData)
        return ({ status: 'Success', message: 'Direccion guardada correctamente', result })
    } catch (error) {
        return ({ status: 'error', message: 'Ocurrio un error al intentar guardar la direccion', error })
    }


}

export const getAddressById = async (req, res) => {
    try {
        const { _id } = req.user
        const result = await addressService.getFullAddress(_id)
        return ({ status: 'Success', message: 'Direccion guardada correctamente', result })
    } catch (error) {
        return ({ status: 'error', message: 'Ocurrio un error al intentar obtener la direccion', error })

    }

}