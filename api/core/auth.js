require('dotenv').config()

const tkn = require('./jwt')
const httpStatus = require('http-status')
const User = require('../user/controller')
const jwt = require('jsonwebtoken')

exports.verifyUser = async (req, res, next) => {
    try {

        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(httpStatus.UNAUTHORIZED).end("Operação não permitida");

            let user = User.findById(decoded.userId)
            req.userId = user;

            next();
        })

    } catch (err) {
        return Promise.reject({ status: httpStatus.UNAUTHORIZED, message: "Token inválido!" })
    }
}

exports.verifyUserProfile = async (token, profile) => {
    try {

        const decoded = await tkn.verifyToken(token);

        const user = await User.findByUserId(decoded.userId);

        let found = user.profiles.find(element => element.description == profile);

        if (found) {
            Promise.resolve({ userId: user.id });
        }
        else {
            return Promise.reject({
                status: httpStatus.FORBIDDEN,
                message: "Usuário não tem permissão para acessar o recurso."
            });
        }

    } catch (err) {
        return Promise.reject({
            status: httpStatus.UNAUTHORIZED,
            message: err.message
        })
    }
}
