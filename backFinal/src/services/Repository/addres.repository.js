export default class AddressRepository{
    constructor(dao){
        this.dao = dao
    }
    getFullAddress = async (userId) => {
        return this.dao.getFullAddress(userId)
    }
    saveAddress = async (addressData) => {
        return this.dao.saveAddress(addressData)
    }
}