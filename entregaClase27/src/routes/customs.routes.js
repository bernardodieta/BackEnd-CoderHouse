import { Router } from "express";
import customResponses from "../config/customResponses.js";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }
    init() {
        this.router.use(customResponses);
    }
    getRouter() {
        return this.router;
    }



    get(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            customResponses,
            this.applyCallbacks(callbacks)
        );
    }

    post(path, policies, ...callbacks) {
        this.router.post(
            path,
            this.handlePolicies(policies),
            customResponses,
            this.applyCallbacks(callbacks)
        );
    }

    put(path, policies, ...callbacks) {
        this.router.put(
            path,
            this.handlePolicies(policies),
            customResponses,
            this.applyCallbacks(callbacks)
        );
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(
            path,
            this.handlePolicies(policies),
            customResponses,
            this.applyCallbacks(callbacks)
        );
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.error(error);
                params[1].status(500).send(error);
            }
        });
    }


    handlePolicies = (policies) => (req, res, next) => {
        console.log("Usuario Autenticado =>", req.user);

        if (policies[0] === "PUBLIC") return next();
        if (!req.user)
            return res
                .status(401)
                .send({ error: "Usuario no autenticado o falta token." });

        if (!policies.includes(req.user.role.toUpperCase())) {
            return res.status(403).send({
                error: "el Usuario no tiene privilegios, revisa tus roles!.",
            });
        }
        next();
    };
}
