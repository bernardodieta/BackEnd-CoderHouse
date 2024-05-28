import { Router } from 'express';
//import del service repository:
import { getAllController, createStudentController } from '../controllers/students.controllers';
const router = Router();

//TODO: Migrar a patrón controller:

router.get('/', async (req, res) => {
    await getAllController(req, res)

})



router.post('/', async (req, res) => {
    await createStudentController(req, res)
})

export default router;