import dotenv from 'dotenv';
import program from '../process.js';

const enviroment = program.opts().mode;

dotenv.config({
    path: enviroment === 'production' ? "./src/config/env.production" : "./src/config/.env.development"
})

export default {
    port: process.env.SERVER_PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPasswor: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
}