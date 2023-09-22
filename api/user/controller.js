require('dotenv').config()
const httpStatus = require('http-status')
const User = require("./model")
const Profile = require('../profile/model')
const auth = require('../core/auth')
const tkn = require('../core/jwt')


exports.create = async (req, res) => {

    try {
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            login: req.body.login,
            password: req.body.password
        });
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        await auth.verifyUserProfile(req.headers['x-access-token'], "Administrador");
        let users = await User.findAll();
        res.send(users);
    } catch (err) {
        res.status(err.status).end(err.message);
    }
}

exports.findById = async (userId) => {
    try {
        let user = await User.findByPk(userId);
        return user;
    } catch (err) {
        console.log("Erro ao buscar usuário por ID");
        res.status(httpStatus.INTERNAL_SERVER_ERROR).end("Erro ao buscar usuário por ID");

    }
}

exports.findByUserId = async (userId) => {
    try {

        let user = await User.findOne({
            where: { id: userId },
            include: {
                model: Profile,
                through: { attributes: [] }
            }
        });
        return user;
    } catch (err) {
        console.log("Erro ao buscar usuário por ID: " + err);


    }
}

exports.findUnique = async (req, res) => {
    try {
        let user = await User.findOne({
            where: { id: req.params.userId },
            include: {
                model: Profile,
                through: { attributes: [] }
            }
        });
        res.json(user);
    } catch (err) {
        console.log("Erro ao buscar usuário por ID" + err);


    }
}

exports.delete = (req, res) => {

    console.log(req.params.id);

    res.end();
}


exports.login = async (req, res) => {
    try {

        let user = await User.findOne({ where: { login: req.body.login, password: req.body.password } });
        if (user) {
            const token = await tkn.createToken({ userId: user.id })
            return res.json({ auth: true, token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Login e/ou senha inválidos" });

        }


    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }

}

exports.logout = async (req, res) => {
    res.json({ auth: false, token: false })
}