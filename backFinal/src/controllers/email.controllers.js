import nodemailer from 'nodemailer';
import config from '../config/config.js'
import __dirname from '../utils.js'
import { ClientError, SendMailError } from '../utils/errors.js';
import { catchedAsync } from '../utils/catchedAsync.js';
import { response } from '../utils/response.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})
transporter.verify(function (error, success) {
    if (error) {
        req.logger.error(`${req.method} en ${req.url} - Error: 'Error al intentar conectar al servicio de emails.'${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new SendMailError('Error al intentar conectar al servicio de emails.')
    } else {
        console.log('Server listo para enviar mensajes.')
    }
})

const sendEmailConfirm = (newOrder, res) => {
    for (const item of newOrder.products) {
        console.log('Items', item.product)
    }

    const structure = `
            <div><h2>Su compra se realizo con éxito</h2></div>
            <div>${JSON.stringify(newOrder.email)}</div>
            <div>Total Pagado: $${JSON.stringify(newOrder.total)}</div>
            <img src=${JSON.stringify(newOrder.products[0].img)}>        
            `
    const { email } = newOrder
    const mailConfirmOptions = {
        from: "Ecommerce Shop - " + config.gmailAccount,
        to: email,
        subject: 'Gracias por realizar la compra',
        html: structure,
        attachments: []
    }

    try {
        transporter.sendMail(mailConfirmOptions, (error, info) => {
            if (error) {
                req.logger.error(`${req.method} en ${req.url} - Error: 'Error al intentar enviar el email con la orden.'${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

                throw new SendMailError('Error al intentar enviar el email con la orden.')
            }
            response(res, 200, info)
        })
    } catch (error) {
        req.logger.error(`${req.method} en ${req.url} - Error: 'Error en el servicio de envio de emails.'${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new SendMailError(error)
    }
}

const TuningsendEmailConfirm = catchedAsync(sendEmailConfirm)

export {
    TuningsendEmailConfirm as sendEmailConfirm
}