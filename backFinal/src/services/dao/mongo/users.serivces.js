import userModel from "./models/users.model.js"
import UserDto from "../../dto/user.dto.js";
import { ClientError, DatabaseError } from "../../../utils/errors.js";

export default class UserServiceDao {
    constructor() {
    }

    userList = async () => {
        try {
            const result = await userModel.find()
            return result;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error: 'Error al obtener la lista de usuarios.'${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener la lista de usuarios.')
        }
    }

    userById = async (_id) => {
        try {
            const result = await userModel.findById(_id)
            const userBack = new UserDto(result)
            return userBack;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener el usuario por ID. ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener el usuario por ID.')
        }
    };

    updateInfo = async (userId, userUpdate) => {
        try {
            const options = { new: true };
            const result = await userModel.findByIdAndUpdate(userId, userUpdate, options);
            return result;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al actualizar la información del usuario' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al actualizar la información del usuario');
        }
    };

    userSave = async (user) => {
        try {
            const result = await userModel.create(user);
            const userBack = new UserDto(result)
            return userBack;
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al guardar el usuario' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al guardar el usuario');
        }
    }

    userByEmail = async (email) => {
        try {
            const result = await userModel.findOne({ email: email })
            return result
        } catch (error) {
            req.logger.error(`${req.method} en ${req.url} - Error:'Error al obtener el usuario por email' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new DatabaseError('Error al obtener el usuario por email');
        }
    }
}


