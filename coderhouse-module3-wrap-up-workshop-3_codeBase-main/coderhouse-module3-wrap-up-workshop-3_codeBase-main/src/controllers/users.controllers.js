import { isValidPassword, generateJWToken, createHash } from '../util.js';
import { studentService } from '../services/repository/services.js';

export const loginController = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await studentService.findByUsername(email);
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(400).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }
        const tokenUser = {
            name: `${user.name} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 120000,
            httpOnly: true
        });
        res.send({ message: "Login successful!" });
        //const access_token = generateJWToken(tokenUser); //-->Con access_token
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
}

export const registerController = async (req, res) => {
    const { name, lastName, email, age, password } = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exists = await studentService.findByUsername(email);
    if (exists) {
        req.logger.warn(`${req.method} en ${req.url} - Error:'El usuario ya existe.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

        return res.status(401).send({ status: "error", message: "Usuario ya existe." });
    }
    const user = {
        name,
        lastName,
        email,
        age,
        password: createHash(password)
    };
    const result = await studentService.createStudent(user);
    res.status(201).send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
}