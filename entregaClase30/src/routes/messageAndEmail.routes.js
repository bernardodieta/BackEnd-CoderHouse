import CustomRouter from "./customs.routes.js";

import { sendEmail } from '../controllers/email.controllers.js'

export class SmsAndEmail extends CustomRouter {
    init() {
        this.get('/email', ['PUBLIC'], async (req, res) => {
            const email = sendEmail()
            email.status === 'error' ? res.sendClientError(email.message) : res.sendSuccess(email)
        }
        )
    }
}