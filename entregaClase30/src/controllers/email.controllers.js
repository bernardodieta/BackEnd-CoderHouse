import nodemailer from 'nodemailer';
import config from '../config/config.js'
import __dirname from '../utils.js'

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
        console.log(error)
    } else {
        console.log('Server listo para enviar mensajes.')
    }
})

const mailOptions = {
    from: "Coder Test - " + config.gmailAccount,
    to: config.gmailAccount,
    subject: 'Correo de pruebas',
    html: `<div>Probando</div>`,
    attachments: []
}

export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(400).send({ message: "error", payload: error })
            }
            console.log('Mensaje enviado: $s', info.messageId)
            res.send({ message: 'Success', payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}




export const sendEmailConfirm = (newOrder, req, res) => {
    console.log('Productos en newOrder',newOrder.products)
    for(const item of newOrder.products){
        console.log('Items',item.product)
    }
    const structure = `
        <div><h2>Su compra se realizo con éxito</h2></div>
        <div>${JSON.stringify(newOrder.email)}</div>
        <div>Total Pagado: $${JSON.stringify(newOrder.total)}</div>
        <img src=${JSON.stringify(newOrder.products[0].img)}>
        
        `

    const { email } = newOrder
   // console.log(email)
    const mailConfirmOptions = {
        from: "Ecommerce Shop - " + config.gmailAccount,
        to: newOrder.email,
        //necesito email
        subject: 'Gracias por realizar la compra',
        html: structure,
        attachments: []
    }
    try {
        transporter.sendMail(mailConfirmOptions, (error, info) => {
            if (error) {
                console.log(error)
                return ({ message: "error", payload: error })
            }
            console.log('Mensaje enviado: $s', info.messageId)
            return ({ message: 'Success', payload: info })
        })
    } catch (error) {
        console.error(error);
        return ({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}