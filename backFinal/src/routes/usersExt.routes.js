import CustomRouter from './customs.routes.js';
import { userLoginController, registerUserController, CuserById, profileById, profileEdit, reqPasswordReset, resetPasswordToken, verifyAuth, logOut } from '../controllers/users.controllers.js'
import { fakeusers } from '../controllers/fakerUsers.js';
import { validateUserRegisterData } from '../services/middlewares/validateDataUsers.js';

export class UsersExtRouter extends CustomRouter {

    init() {
        this.get('/auth/verify', ['PUBLIC'], verifyAuth);

        this.post('/logout', ['PUBLIC'], logOut);

       // this.get('/fakeruser', ['PUBLIC'], fakeusers)

        this.post('/login', ['PUBLIC'], userLoginController);

        this.post('/register', ['PUBLIC'], validateUserRegisterData, registerUserController)

        this.get('/profile', ["USER", "PREMIUM", 'ADMIN'], profileById)

        this.put('/profile/edit', ["USER", "PREMIUM", 'ADMIN'], profileEdit)

        this.get('/:id?', ["USER", "PREMIUM", 'ADMIN'], CuserById)

        this.post('/request-password-reset', ['PUBLIC'], reqPasswordReset)

        this.post('/reset-password/:token', ['PUBLIC'], resetPasswordToken)

    }
}