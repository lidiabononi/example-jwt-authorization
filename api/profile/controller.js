const httpStatus = require('http-status')
const Profile = require("./model")

exports.create = async (req, res) => {
    try {
        let profile = await Profile.create({ description: req.body.description });
        res.send(profile);
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST);
        res.send("Erro ao criar perfil de usuário.");
    }

}

exports.findAll = async (req, res) => {
    try {
        let profiles = await Profile.findAll();
        res.send(profiles);
    } catch (err) {
        console.log("Erro ao buscar perfis: " + err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).end("Erro ao buscar perfis.");
    }

}
