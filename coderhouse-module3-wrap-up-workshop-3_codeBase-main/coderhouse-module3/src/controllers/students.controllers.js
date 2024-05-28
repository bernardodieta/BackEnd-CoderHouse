import { studentService } from '../services/repository/services.js';

export const getAllController = async () => {
    let students = await studentService.getAll();
    if (!students) res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    res.send(students)
}


export const createStudentController = async (req, res) => {
    if (req.body) {
        await studentService.createStudent(req.body)
    } else {
        res.status(500).send({ error: error, message: "No se pudo guardar el estudiante." });
    }

}