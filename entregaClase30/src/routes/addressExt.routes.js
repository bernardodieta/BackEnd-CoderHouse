import CustomRouter from "./customs.routes.js";
import { saveAddressController, getAddressById } from '../controllers/address.controllers.js'

export class AddressRoutes extends CustomRouter {
    init() {

        this.post('/save/:userId', ['PUBLIC'], async (req, res) => {
            console.log('paso')
            const result = await saveAddressController(req, res)
            res.sendSuccess({ message: 'Direccion Guardada', result })
        })

        this.get('/:userId', ['PUBLIC'], async (req, res) => {
            const result = await getAddressById(req, res)
            res.sendSuccess(result)
        })
    }

}