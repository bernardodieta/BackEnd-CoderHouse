import { Router } from 'express';
//import del service repository:
import { getallController, saveStudentController } from '../controllers/students.controllers.js';
const router = Router();

//TODO: Migrar a patrón controller:

router.get('/', getallController)

router.post('/', saveStudentController)

export default router;