import { userService, cartService } from '../services/services.js'
import { generateJWToken, isValidPassword } from "../utils.js";
import { UsersClass } from './classes/usersClass.js'

export const userListController = async (req, res) => {
    try {
        let result = await userService.userList();
        return result
    } catch (error) {
        return error
    }
}
export const profileById = async (req, res) => {
    try {
        const { userId } = req.params
        const userProfile = await userService.userById(userId)
        const profile =
        {
            first_name: userProfile.first_name,
            last_name: userProfile.last_name,
            email: userProfile.email,
            age: userProfile.age,
            role: userProfile.role,
            favProducts: userProfile.favProducts
        }
        return profile
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
        const cart = await cartService.getCartByUserId(user._id)

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


        user.password = ''
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
    console.log('llego')

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


export const profileEdit = async (req, res) => {
    try {
        const { userId } = req.params
        const { userUpdate } = req.body
        const user = await userService.updateInfo(userId, userUpdate)
        return user
    } catch (error) {
        console.log(error)
        return ({ satus: 'error', message: 'Ocurrio un error al actualziar los datos del usuario.' })
    }

}

