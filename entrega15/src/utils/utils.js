// Configuracion de MULTER
// Objeto de configuracion
import multer from 'multer'
import { __dirname } from '../dirname.js'

const storage = multer.diskStorage({
    // ubicaion del directorio donde voy a guardar los archivos
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/public/up`)
    },

    // el nombre que quiero que tengan los archivos que voy a subir
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({
    storage,
    // si se genera algun error, lo capturamos
    onError: function (err, next) {
        console.log(err);
        next();
    }
})