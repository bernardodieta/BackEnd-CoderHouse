import addressModel from './models/address.models.js'
export default class AddressServicesDao {
    constructor() {

    }
    getFullAddress = async (userId) => {
        const result = await addressModel.find({ userId: userId })
        return result
    }
    saveAddress = async (addressData) => {        
        const result = await addressModel.create(addressData)
        return result
    }
}