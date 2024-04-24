import CustomRouter from './customs.routes.js';
import { userLoginController, registerUserController, userById } from '../controllers/users.controllers.js'

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
            const { email, password } = req.body
            await userLoginController(email, password, res);
        });

        this.get('/:id', ["PUBLIC"], async (req, res) => {
            const { id } = req.params
            const result = await userById(id)
            console.log('Result: ', result)
            if (result.error) {
                res.sendClientError()
            }
            res.sendSuccess(result)
        })

        this.post('/register', ['PUBLIC'], async (req, res) => {
            try {
                const result = await registerUserController(req)
                if (result.status === "error") {
                    res.sendClientError({ message: "El usuario ya existe" })
                }
               
                res.sendSuccess({ message: "Usuario Creado con éxito", results: result })
            } catch (error) {
                return error
            }

        })

    }
}