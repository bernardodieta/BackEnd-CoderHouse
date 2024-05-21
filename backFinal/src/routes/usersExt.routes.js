import CustomRouter from './customs.routes.js';
import { userLoginController, registerUserController, CuserById, profileById, profileEdit } from '../controllers/users.controllers.js'
import { fakeusers } from '../controllers/fakerUsers.js';
export class UsersExtRouter extends CustomRouter {

    init() {
        this.get('/auth/verify', ['USER'], async (req, res) => {
            req.user
                ? response(res, 200, { isAuthenticated: true, user: req.user })
                : response(res, 200, { isAuthenticated: false })
        });
        this.get('/fakeruser', ['PUBLIC'], async (req, res, next) => {
            fakeusers(req, res, next)
        })

        this.post('/login', ['PUBLIC'], async (req, res, next) => {
            userLoginController(req, res, next);
        });

        this.post('/logout', ['PUBLIC'], async (req, res) => {
            res.clearCookie('jwtCookieToken');
            response(res, 200, 'Logout confirmado.')
        });

        this.post('/register', ['PUBLIC'], async (req, res) => {
            registerUserController(req, res)
        })

        this.get('/profile', ['USER'], async (req, res) => {
            profileById(req, res)
        })

        this.put('/profile/edit/:userId', ['USER'], async (req, res) => {
            profileEdit(req, res)
        })

        this.get('/:id?', ["USER"], async (req, res) => {
            CuserById(req, res)

        })

    }
}