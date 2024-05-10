import CustomRouter from "./customs.routes.js";
import { saveAddressController, getAddressById } from '../controllers/address.controllers.js'

export class AddressRoutes extends CustomRouter {
    init() {

        this.post('/save/:userId', ['USER'], async (req, res) => {
            const result = await saveAddressController(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })

        this.get('/', ['USER'], async (req, res) => {
            const result = await getAddressById(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })
    }

}