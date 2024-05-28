import MailingService from "../email/mailing.js";
export default class StudentsRepository {
    constructor(dao) {
        this.dao = dao;
        this.MailingService = new MailingService()
    }
    getAll = () => {
        return this.dao.getAll();
    }
    getBy = (params) => {
        return this.dao.getBy(params);
    }
    createStudent = (student) => {
        const result = this.dao.save(student);
        const from = 'bernardodieta@gmail.com'
        const subject = "Prueba de correo"
        const html = `<div>    Gracias por registrarte! ${student.name}    </div>`
        this.MailingService.sendSimpleMail({ from, to: student.email, subject, html })
        return result
    }
    update = (id, student) => {
        return this.dao.updateStudent(id, student);
    }
    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    };


};