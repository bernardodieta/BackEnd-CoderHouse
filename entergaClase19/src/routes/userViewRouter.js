import { Router } from "express";

const userViewRouter = Router();

userViewRouter.get("/login", (req, res) => {
    res.render('login')
});

userViewRouter.get("/register", (req, res) => {
    res.render('register')
});

// Cuaando ya tenemos una session activa con los datos del user, renderizamos la vista profile
userViewRouter.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
});

export { userViewRouter };