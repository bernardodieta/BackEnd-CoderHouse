import CartServices from "../services/dao/mongo/carts.services.js";
import UserService from "../services/dao/mongo/users.serivces.js";
import { createHash, generateJWToken, isValidPassword } from "../utils.js";
import { UsersClass } from './classes/usersClass.js'

const userService = new UserService()
const cartServices = new CartServices()

export const userListController = async (req, res) => {
    try {
        let result = await userService.userList();
        return result
    } catch (error) {
        return error
    }
}

export const userById = async (id, req, res) => {
    try {
        const result = await userService.userById(id)
        return result
    } catch (error) {
        return error
    }
}

export const userLoginController = async (email, password, res) => {
    try {
        const user = await userService.userByEmail(email);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Email no encontrado: ' + email });
        }
        if (!isValidPassword(user, password)) {
            return res.status(401).json({ status: 'error', message: 'El usuario o la contraseña no coinciden.' });
        }
        const cart = await cartServices.getCartByUserId(user._id)

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


        res.status(200).json({
            status: 'Success',
            message: 'Login exitoso.',
            token: access_token,
            userId: user._id,
            usercartId: cart.user,

            //este user lo devuelvo para usarlo momentaneamente en el frontend de React
            user
        });

    } catch (error) {
        console.error('Error interno:', error);
        res.status(500).json({ status: 'error', message: 'Error interno.' });
    }
}

export const registerUserController = async (req, res) => {
    const { first_name, last_name, age, email, password, role } = req.body
    role = role.toLowerCase()
    if (role !== 'admin') {
        return { message: 'Rol no permitido, se creo tu usuario con un Rol de user por defecto' }
    }
    const exists = await userService.userByEmail(email)
    if (exists) {
        return ({ status: 'error', message: 'El usuario ya existe.' })
    }
    const newUser = new UsersClass(first_name, last_name, age, email, password, role)

    try {
        const result = await userService.userSave(newUser)
        return result

    } catch (error) {
        return ({ status: 'error', message: 'Ocurrio un error al llamar al servicio..' })
    }

}

