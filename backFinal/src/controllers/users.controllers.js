import { userService, cartService } from '../services/services.js'
import { generateJWToken, isValidPassword } from "../utils.js";
import { UsersClass } from '../services/dto/usersClass.js'
import { response } from '../utils/response.js';
import { AuthenticationError, ConflictError, NotFoundError } from '../utils/errors.js';
import { catchedAsync } from '../utils/catchedAsync.js';

const userListController = async (req, res) => {
    let result = await userService.userList();
    if (!result) {
        throw new NotFoundError('No se encontraron usuarios para listar')
    }
    response(res, 200, result)
}

const profileById = async (req, res) => {
    const { _id } = req.user
    const userProfile = await userService.userById(_id)
    if (!userProfile) {
        req.logger.warning(`${req.method} en ${req.url} - Error:'No se encontró el perfil del usuario.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontró el perfil del usuario.')
    }
    const profile =
    {
        name: userProfile.name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        age: userProfile.age,
        role: userProfile.role,
        favProducts: userProfile.favProducts
    }
    response(res, 200, profile)
}

const CuserById = async (req, res) => {
    const { _id } = req.user
    const result = await userService.userById(_id)
    console.log('llego');
    if (!result) {
        req.logger.warning(`${req.method} en ${req.url} - Error:'No se encontro un usuario con ese ID.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontro un usuario con ese ID.')
    }
    response(res, 200, result)
}

const userLoginController = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userService.userByEmail(email);
    if (!user) {
        req.logger.warning(`${req.method} en ${req.url} - Error:'No se encontro un usuario con ese EMAIL.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontro un usuario con ese EMAIL.')
    }
    if (!isValidPassword(user, password)) {
        throw new AuthenticationError('El usuario o la contraseña no coinciden.')
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

    let logindata = {
        token: access_token,
        userId: user._id,
        usercartId: cart.user,
        user
    }
    response(res, 200, logindata)
    next()
}

const registerUserController = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    const exists = await userService.userByEmail(email);
    if (exists) {
        req.logger.warning(`${req.method} en ${req.url} - Error:'El usuario ya existe.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new ConflictError('El usuario ya existe.')
    }
    const newUser = new UsersClass(first_name, last_name, age, email, password);
    const user = await userService.userSave(newUser);
    const newCart = await cartService.createEmptyCart(user._id);
    await userService.updateInfo(user._id, { cart: newCart._id });
    response(res, 201, user)
};

const profileEdit = async (req, res) => {
    const { _id } = req.user
    const { userUpdate } = req.body
    const user = await userService.updateInfo(_id, userUpdate)
    response(res, 201, user)
}


const TuninguserListController = catchedAsync(userListController)
const TuningprofileById = catchedAsync(profileById)
const TuningCuserById = catchedAsync(CuserById)
const TuninguserLoginController = catchedAsync(userLoginController)
const TuningregisterUserController = catchedAsync(registerUserController)
const TuningprofileEdit = catchedAsync(profileEdit)

export {
    TuninguserListController as userListController,
    TuningprofileById as profileById,
    TuningCuserById as CuserById,
    TuninguserLoginController as userLoginController,
    TuningregisterUserController as registerUserController,
    TuningprofileEdit as profileEdit
}