import userModel from "./models/users.model.js"


export default class UserService {
    constructor() {
    }

    userList = async () => {
        const result = await userModel.find()
        return result;
    }

    userById = async (id) => {
        const result = await userModel.findById(id)
        return result;
    }
    userByEmail = async (email) => {        
        const result = await userModel.findOne(email)
        return result;
    }

    updateInfo = async (filter, value) => {
        const result = await userModel.updateOne(filter, value);
        return result;
    }

    userSave = async (user) => {
        const result = await userModel.create(user);
        return result;
    }

    userByEmail = async (email) => {
        const result = await userModel.findOne({ email: email })
        return result
    }


}


