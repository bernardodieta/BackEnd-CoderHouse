import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../services/db/models/user.model.js';
import { createHash, isValidPassword } from '../utils/utils.js';
import GitHubStrategy from 'passport-github2'

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.4c828d9538584d1c',
            clientSecret: 'f7d756a38971cc1d000349cee2ff366ae715175e',
            callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
        }, async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido del usuario:");
            console.log(profile);
            try {
                //const user = await userModel.findOne({ email: profile._json.email }); AL NO RECIBIR ESTE DATO NO PUEDO VERIFICAR CON LA BASE DE DATOS.
                const user = await userModel.findOne({ email: 'bernardodieta@gmail.com' });//SI LO HARDCODE TODO FUNCIONA Y EL PERFIL ME CARGA LOS DATOS
                console.log("Usuario encontrado para login:");
                console.log(profile._json.name);
                console.log(profile._json.email);//NUNCA RECIBO ESTE DATO ME LO MUESTRA COMO NULL EN LOS DATOS QUE ME DEVUELVE GITHUB

                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);

                    
                    // let newUser = {
                    //     name: profile._json.name,
                    //     lastName: profile._json.name,
                    //     email: profile._json.email,
                    //     password: '',                        
                    //     loggedBy: 'GitHub'
                    // }

                    let newUser = {
                        name: 'Hardcode',
                        lastName: 'Hardcode',
                        email: 'bernardodieta@gmail.com',
                        password: 'asd',                        
                        loggedBy: 'GitHub'
                    }
                    console.log(newUser)
                    const result = await userModel.create(newUser)
                    return done(null, result)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { name, lastName, email } = req.body
            try {
                const exists = await userModel.findOne({ email })
                if (exists) {
                    console.log("El usuario ya existe!!");
                    return done(null, false)
                }

                const user = {
                    name,
                    lastName,
                    email,
                    username,
                    password: createHash(password)
                }

                const result = await userModel.create(user);

                return done(null, result)
            } catch (error) {
                return done("Error registrando el usuario: " + error)
            }
        }
    ))

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log("Usuario encontrado para login:");
                console.log(user);

                if (!user) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false)
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })

};


export default initializePassport;