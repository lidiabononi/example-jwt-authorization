const UserProfile = require("./model")

exports.create = async (req, res) => {
    try {
        let profile = await UserProfile.create({
            userId: req.body.userId,
            profileId: req.body.profileId
        });
        res.send(profile);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
}

exports.findAll = async (req, res) => {
    try {
        let profiles = await UserProfile.findAll();
        res.send(profiles);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
}

//Criar o findByUser
exports.findByUserId = async (req, res) => {
    try {
        let userProfiles = await UserProfile.findAll({
            attributes: ['profileId'],
            where: {
                userId: req.params.userId
            }
        })
        res.json(userProfiles)
    } catch (err) {
        res.json(err);
        res.status(500).end();
    }
}