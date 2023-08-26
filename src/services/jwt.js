import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const SECRET_KEY = config.SECRET_JWT;
const USER = config.USER_BACKOFFICE;
const PASS = config.PASS_BACKOFFICE;

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('Acceso denegado');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Token no válido');
        req.user = user;
        next();
    });
};


export const generateToken = (user, password) => {
    let token;
    if(user === USER && password === PASS){
        token = jwt.sign({ username: user }, SECRET_KEY);
    }
    return token;
} 