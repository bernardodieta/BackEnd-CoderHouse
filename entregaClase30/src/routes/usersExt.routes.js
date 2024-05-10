import CustomRouter from './customs.routes.js';
import { userLoginController, registerUserController, CuserById, profileById, profileEdit } from '../controllers/users.controllers.js'

export class UsersExtRouter extends CustomRouter {

    init() {
        //Esta la uso para react para mandar verificar si esta logeado cuando hago algunas cosas
        this.get('/auth/verify', ['USER'], async (req, res) => {
            if (req.user) {
                res.status(200).json({ isAuthenticated: true, user: req.user });
            } else {
                res.status(401).json({ isAuthenticated: false });
            }
        });

        this.post('/login', ['PUBLIC'], async (req, res) => {
            const login = await userLoginController(req, res);
            login.status === 'error' ? res.sendClientError(login.message) : res.sendSuccess(login)

        });

        this.post('/logout', ['PUBLIC'], async (req, res) => {
            res.clearCookie('jwtCookieToken');
            res.sendSuccess({ message: 'Logout successful' });
        });



        this.post('/register', ['PUBLIC'], async (req, res) => {
            const result = await registerUserController(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)
        })

        this.get('/profile', ['USER'], async (req, res) => {
            const user = await profileById(req, res)
            user.status === 'error' ? res.sendClientError(user.message) : res.sendSuccess(user)

        })

        this.put('/profile/edit/:userId', ['USER'], async (req, res) => {
            const user = await profileEdit(req, res)
            user.status === 'error' ? res.sendClientError(user.message) : res.sendSuccess(user)

        })


        this.get('/:id?', ["USER"], async (req, res) => {
            const result = await CuserById(req, res)
            result.status === 'error' ? res.sendClientError(result.message) : res.sendSuccess(result)

        })

    }
}