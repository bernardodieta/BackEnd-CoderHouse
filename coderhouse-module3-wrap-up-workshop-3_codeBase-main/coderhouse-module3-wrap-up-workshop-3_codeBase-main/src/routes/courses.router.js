import { Router } from 'express';
//import del service para Courses.
//import CourseService from '../services/filesystem/courses.service.js';
import CourseServiceDao from '../services/db/dao/courses.dao.js';
import { getallController, saveCoursesController } from '../controllers/courses.controllers.js';

const router = Router();
const coursesService = new CourseServiceDao();

router.get('/', getallController)

router.post('/', saveCoursesController)

export default router;