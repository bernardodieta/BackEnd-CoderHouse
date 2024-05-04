import { addressService } from "../services/services.js"

export const saveAddressController = async (req, res) => {
    const { userId } = req.params
    const { addressData } = req.body
    addressData.userId = userId
    console.log('addres antes:', addressData)
    const result = await addressService.saveAddress(addressData)
    return result
  
}

export const getAddressById = async (req, res) => {
    const { userId } = req.params
    const result = await addressService.getFullAddress(userId)
    return result
}