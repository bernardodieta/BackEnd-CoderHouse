import { Router } from "express";
import passport from 'passport'

const sessionRouterView = Router()

sessionRouterView.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
})
sessionRouterView.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user
    console.log(req.user)

    req.session.user = {
        name: `${user.name} ${user.lastName}`,
        email: user.email        
    }
    req.session.admin = true;
    res.redirect("/users")
})


sessionRouterView.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ stauts: 'success', message: "User creado de forma exitosa!!" })}
);

sessionRouterView.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
    req.session.user = {
        name: `${user.name} ${user.lastName}`,
        email: user.email,
        username: user.username
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

sessionRouterView.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

sessionRouterView.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});
sessionRouterView.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: "error logout", mensaje: "Error al cerrar la sesion" });
        }
        res.send("Sesion cerrada correctamente.");
    });
});

export { sessionRouterView }