import { Router } from 'express';
//Service import
import { loginController, registerController } from '../controllers/users.controllers.js';



const router = Router();

router.post("/login", loginController);

//Agregar metodo de registrar estudiante:
router.post("/register", registerController);

export default router;