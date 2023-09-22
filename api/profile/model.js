const db = require("../configs/sequelize")
const { Sequelize, Model, DataTypes } = db.Sequelize

const sequelize = db.sequelize

class Profile extends Model { }
Profile.init({
    description: {
        type: DataTypes.STRING,
        unique: true
    }
}, { sequelize, modelName: "profiles" })

module.exports = Profile