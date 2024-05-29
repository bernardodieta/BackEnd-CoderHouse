import { userService, cartService } from '../services/services.js'
import { generateJWToken, isValidPassword } from "../utils.js";
import { UsersClass } from '../services/dto/usersClass.js'
import { response } from '../utils/response.js';
import { AuthenticationError, ConflictError, NotFoundError, ServerError } from '../utils/errors.js';
import { catchedAsync } from '../utils/catchedAsync.js';
import config from '../config/config.js'
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
});

const userListController = async (req, res, next) => {
    try {
        const result = await userService.userList(req.logger);
        if (!result) {
            throw new NotFoundError('No se encontraron usuarios para listar');
        }
        response(res, 200, result);
    } catch (error) {
        next(error);
    }
};

const profileById = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const userProfile = await userService.userById(_id, req.logger);
        const profile = {
            name: userProfile.name,
            last_name: userProfile.last_name,
            email: userProfile.email,
            age: userProfile.age,
            role: userProfile.role,
            favProducts: userProfile.favProducts
        };
        response(res, 200, profile);
    } catch (error) {
        next(error);
    }
};

const CuserById = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const result = await userService.userById(_id);
        response(res, 200, result);
    } catch (error) {
        next(error);
    }
};

const userLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.userByEmail(email, req.logger);
        if (!isValidPassword(user, password)) {
            throw new AuthenticationError('El usuario o la contraseña no coinciden.');
        }
        const cart = await cartService.getCartByUserId(user._id, req.logger);
        const tokenUser = {
            usercartId: cart.user,
            _id: user._id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 12000000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        user.password = '';

        let logindata = {
            token: access_token,
            userId: user._id,
            usercartId: cart.user,
            user
        };
        response(res, 200, logindata);
    } catch (error) {
        next(error)
    }
};

const registerUserController = async (req, res, next) => {
    try {
        const { first_name, last_name, age, email, password, role } = req.body;
        const exists = await userService.userByEmail(email, req.logger);
        if (exists) {
            throw new ConflictError('El usuario ya existe.');
        }
        let userRole = role;
        if (!role || (role !== 'admin' && role !== 'premium')) {
            userRole = 'user';
        }
        const newUser = new UsersClass(first_name, last_name, age, email, password, userRole);
        const user = await userService.userSave(newUser, req.logger);
        const newCart = await cartService.createEmptyCart(user._id, req.logger);
        await userService.updateInfo(user._id, { cart: newCart._id });
        response(res, 201, user);
    } catch (error) {
        next(error);
    }
};

const profileEdit = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { userUpdate } = req.body;
        const user = await userService.updateInfo(_id, userUpdate, req.logger);
        response(res, 201, user);
    } catch (error) {
        next(error);
    }
};

const reqPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;   
        const token = jwt.sign({ email }, 'resetpassword123456', { expiresIn: '1h' });
        const resetLink = `http://localhost:8080/api/users/reset-password/${token}`;
        const mailOptions = {
            from: 'bernardodieta@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `<a href="${resetLink}">Reset Password</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new ServerError('Error enviando el mail.');
            }
            res.send(resetLink);
        });

    } catch (error) {
        next(error);
    }
};

const resetPasswordToken = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const decoded = jwt.verify(token, 'resetpassword123456');
        const user = await userService.userByEmail(decoded.email, req.logger);
   
        if (bcrypt.compareSync(newPassword, user.password)) {
            throw new ConflictError('La nueva password no puede ser igual a la anterior.');
        }
        user.password = bcrypt.hashSync(newPassword, 10);
        await userService.updateInfo(user._id, user, req.logger);
        response(res, 201, 'Constraseña actualizada');
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new NotFoundError('El link ya expiro, vuelva a solicitar otro link.');
        }
        next(error);
    }
};


const TuninguserListController = catchedAsync(userListController)
const TuningprofileById = catchedAsync(profileById)
const TuningCuserById = catchedAsync(CuserById)
const TuninguserLoginController = catchedAsync(userLoginController)
const TuningregisterUserController = catchedAsync(registerUserController)
const TuningprofileEdit = catchedAsync(profileEdit)
const TuningreqPasswordReset = catchedAsync(reqPasswordReset)
const TuningresetPasswordToken = catchedAsync(resetPasswordToken)

export {
    TuninguserListController as userListController,
    TuningprofileById as profileById,
    TuningCuserById as CuserById,
    TuninguserLoginController as userLoginController,
    TuningregisterUserController as registerUserController,
    TuningprofileEdit as profileEdit,
    TuningreqPasswordReset as reqPasswordReset,
    TuningresetPasswordToken as resetPasswordToken
}