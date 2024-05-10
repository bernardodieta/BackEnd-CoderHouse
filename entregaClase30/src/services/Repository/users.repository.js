export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    userList = async () => {
        return this.dao.userList()
    }

    userSave = async (user) => {
        return this.dao.userSave(user)
    }

    userById = async (_id) => {
        return this.dao.userById(_id)
    }

    userByEmail = async (email) => {
        return this.dao.userByEmail(email)
    }
    updateInfo = async (userId, userUpdate) => {
        return this.dao.updateInfo(userId, userUpdate)
    }
}