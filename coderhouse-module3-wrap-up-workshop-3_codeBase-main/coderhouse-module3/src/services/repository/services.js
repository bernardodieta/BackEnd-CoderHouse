import Students from "../db/dao/students.dao.js";

import StudentRepository from "./students.repository.js";

const studentDao = new Students();
// TODO: Implementar el patron para el DAO de cursos.

export const studentService = new StudentRepository(studentDao);