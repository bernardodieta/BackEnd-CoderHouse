import CustomRouter from "./customs.routes.js";
import { sendEmail } from '../controllers/email.controllers.js'

export class SmsAndEmail extends CustomRouter {
    init() {
        this.get('/email', ['PUBLIC'], async (req, res) => {
            const email = sendEmail()
            return res.sendSuccess({
                message: 'Email Enviado',
                data: email
            });
        }
        )
    }
}