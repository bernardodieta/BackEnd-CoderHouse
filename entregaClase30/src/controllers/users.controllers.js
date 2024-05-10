import { userService, cartService } from '../services/services.js'
import { generateJWToken, isValidPassword } from "../utils.js";
import { UsersClass } from './classes/usersClass.js'

export const userListController = async (req, res) => {
    try {
        let result = await userService.userList();
        return ({ status: 'Success', message: 'Lista de usuarios: ', result });
    } catch (error) {
        return ({ status: 'error', message: 'Ocurrio un error al obtener la lista de usuarios: ', error });

    }
}
export const profileById = async (req, res) => {
    try {
        const { _id } = req.user
        const userProfile = await userService.userById(_id)
        const profile =
        {
            name: userProfile.name,
            last_name: userProfile.last_name,
            email: userProfile.email,
            age: userProfile.age,
            role: userProfile.role,
            favProducts: userProfile.favProducts
        }
        return ({ status: 'Success', message: 'Perfil Encontrado: ', profile });

    } catch (error) {
        return ({ status: 'error', message: 'Perfil no encontrado: ', error });
    }

}

export const CuserById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await userService.userById(id)
        if (!result) {
            return ({ status: 'error', message: 'No se encontro un usuario con ese ID.' })
        }
        return ({ message: 'Usuario encontrado:', result })
    } catch (error) {
        return ({ status: 'error', message: 'Ocurrio un error buscando el usuario .', error })
    }
}

export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.userByEmail(email);
        if (!user) {
            return ({ status: 'error', message: 'Email no encontrado: ' + email });
        }
        if (!isValidPassword(user, password)) {
            return ({ status: 'error', message: 'El usuario o la contraseña no coinciden.' });
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
        return ({ status: 'Success', message: 'Login exitoso.', token: access_token, userId: user._id, usercartId: cart.user, user });
    } catch (error) {
        console.error('Error interno:', error);
        return ({ status: 'error', message: 'Error interno.' });
    }
}

export const registerUserController = async (req, res) => {
    try {
        const { first_name, last_name, age, email, password } = req.body;
        const exists = await userService.userByEmail(email);

        if (exists) {
            return ({ status: 'error', message: 'El usuario ya existe.', exists });
        }
        const newUser = new UsersClass(first_name, last_name, age, email, password);
        const user = await userService.userSave(newUser);

        if (!user || !user._id) {
            return ({ status: 'error', message: 'Error al crear el usuario.' });
        }
        const newCart = await cartService.createEmptyCart(user._id);

        if (!newCart || !newCart._id) {
            return ({ status: 'error', message: 'Error al crear el carrito de compras.' });
        }
        await userService.updateInfo(user._id, { cart: newCart._id });

        return ({ status: 'Success', message: 'Usuario y carrito creados con éxito', userData: user });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return ({ status: 'error', message: 'Error interno del servidor', error });
    }
};



export const profileEdit = async (req, res) => {
    try {
        const { _id } = req.user
        const { userUpdate } = req.body
        const user = await userService.updateInfo(_id, userUpdate)
        return ({ status: 'Success', message: 'Perfil Actualizado correctamente', user });
    } catch (error) {
        console.log(error)
        return ({ satus: 'error', message: 'Ocurrio un error al actualziar los datos del usuario.', error })
    }

}

