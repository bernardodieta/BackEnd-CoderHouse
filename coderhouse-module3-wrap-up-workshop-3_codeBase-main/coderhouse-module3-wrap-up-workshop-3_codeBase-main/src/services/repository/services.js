import Students from "../db/dao/students.dao.js";
import Courses from '../db/dao/courses.dao.js'


import StudentRepository from "./students.repository.js";
import CoursesRepository from "./courses.repository.js";


const studentDao = new Students();
const coursesDao = new Courses()
// TODO: Implementar el patron para el DAO de cursos.

export const coursesService = new CoursesRepository(coursesDao)
export const studentService = new StudentRepository(studentDao);