import CustomRouter from "./customs.routes.js";
import { saveAddressController, getAddressById } from '../controllers/address.controllers.js'
import { validateName } from '../services/middlewares/validateName.js'


export class AddressRoutes extends CustomRouter {
    init() {

        this.post('/save', ['USER'], validateName, async (req, res, next) => {
            saveAddressController(req, res, next)
        })

        this.get('/', ['USER'], async (req, res) => {
            getAddressById(req, res)
        })
    }

} 