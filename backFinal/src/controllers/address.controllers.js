import { addressService } from "../services/services.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import { NotFoundError } from "../utils/errors.js";
import { response } from "../utils/response.js";

const saveAddressController = async (req, res) => {
    const { _id } = req.user;
    const { country, state, city, zipcode, addressText, numext } = req.body;
    const addressData = {
        country, state, city, zipcode, addressText, numext
    }
    addressData.userId = _id;
    const result = await addressService.saveAddress(addressData, req.logger);
    response(res, 200, result);
};

const getAddressById = async (req, res) => {
    const { _id } = req.user;
    const result = await addressService.getFullAddress(_id, req.logger);
    if (!result) {
        req.logger.warning(`${req.method} en ${req.url} - Error: 'No se encontro una direccion para ese usuario' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontro una direccion para ese usuario')
    }
    response(res, 200, result)
};

const TuningSaveAddressController = catchedAsync(saveAddressController);
const TuningGetAddressById = catchedAsync(getAddressById);

export { TuningSaveAddressController as saveAddressController, TuningGetAddressById as getAddressById };
