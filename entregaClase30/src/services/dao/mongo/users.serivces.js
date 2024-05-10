import userModel from "./models/users.model.js"
import mongoose from "mongoose";
import UserDto from "../../dto/user.dto.js";

export default class UserServiceDao {
    constructor() {
    }

    userList = async () => {
        const result = await userModel.find()
        return result;
    }

    userById = async (_id) => {
        try {
            const isValidObjectId = mongoose.Types.ObjectId.isValid;
            if (!isValidObjectId(_id)) {
                console.error('ID del usuario inválido:', _id);
                return;
            }
            const result = await userModel.findById(_id)
            const userBack = new UserDto(result)
            return userBack;
        } catch (error) {
            return error
        }
    };
    userByEmail = async (email) => {
        console.log(email);
        const result = await userModel.findOne(email)
        const userBack = new UserDto(result)
        return userBack;
    }

    updateInfo = async (userId, userUpdate) => {
        const options = { new: true };        
        const result = await userModel.findByIdAndUpdate(userId, userUpdate, options);        
        return result;
    };

    userSave = async (user) => {
        const result = await userModel.create(user);
        const userBack = new UserDto(result)
        return userBack;
    }

    userByEmail = async (email) => {
        const result = await userModel.findOne({ email: email })
        return result
    }

}


