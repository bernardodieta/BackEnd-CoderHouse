import CustomRouter from './customs.routes.js';
import { userLoginController, registerUserController, CuserById, profileById, profileEdit, reqPasswordReset, resetPasswordToken } from '../controllers/users.controllers.js'
import { fakeusers } from '../controllers/fakerUsers.js';
import { response } from '../utils/response.js';
export class UsersExtRouter extends CustomRouter {

    init() {
        this.get('/auth/verify', ['PUBLIC'], async (req, res) => {
            req.user
                ? response(res, 200, { isAuthenticated: true, user: req.user })
                : response(res, 200, { isAuthenticated: false })
        });
        this.post('/logout', ['PUBLIC'], async (req, res) => {
            res.clearCookie('jwtCookieToken');
            response(res, 200, 'Logout confirmado.')
        });

        this.get('/fakeruser', ['PUBLIC'], fakeusers)

        this.post('/login', ['PUBLIC'], userLoginController);

        this.post('/register', ['PUBLIC'], registerUserController)

        this.get('/profile', ["USER", "PREMIUM",'ADMIN'], profileById)

        this.put('/profile/edit', ["USER", "PREMIUM",'ADMIN'], profileEdit)

        this.get('/:id?', ["USER", "PREMIUM",'ADMIN'], CuserById)

        this.post('/request-password-reset', ['PUBLIC'], reqPasswordReset)

        this.post('/reset-password/:token', ['PUBLIC'], resetPasswordToken)

    }
}