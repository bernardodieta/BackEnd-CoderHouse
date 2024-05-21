import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import multer from "multer";
import { getCartUser } from "./controllers/carts.controllers.js";
import { AuthenticationError, AuthorizationError } from "./utils/errors.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "188080s" });
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError("Usuario no autentificado o falta token.")
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      throw new AuthorizationError("Token invalido, no autorizado!")
    req.user = credentials.user;
    const cart = getCartUser(user.userId)
    req.user.cart = cart
    next();
  });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user)
      throw new AuthenticationError("Usuario no autentificado o falta token.")
    if (req.user.role !== role) {
      throw new AuthorizationError("Acceso Prohibido: El usuario no tiene permisos con este rol.")
    }
    next();
  };
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log('Recibiendo archivo:', file.originalname);
    cb(null, Date.now() + '-' + file.originalname)
  }
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('No es un archivo de imagen'), false);
    }
  }
});

export default __dirname;
