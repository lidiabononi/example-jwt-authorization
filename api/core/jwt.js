const jwt = require('jsonwebtoken')

exports.createToken = (entity) => {
    return jwt.sign(entity, process.env.SECRET, {
        expiresIn: process.env.EXPIRATION
    })
}

exports.verifyToken = (token) => {
    try {
        token = token.split(" ")[1];
        if (!token) {
            return Promise.reject({ message: 'Token inválido' })
        }
        return jwt.verify(token, process.env.SECRET)

    } catch (error) {
        return Promise.reject({ message: 'Token inválido' })
    }
}
