export default class CoursesRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    getById = (id) => {
        return this.dao.getById(id);
    }
    saveCourse = (course) => {
        return this.dao.saveCourse(course);
    }
    updateCourse = (id, course) => {
        return this.dao.updateStudent(id, course);
    }

    

};