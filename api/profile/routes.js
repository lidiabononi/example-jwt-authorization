const auth = require("../core/auth")

module.exports = (app) => {

    const controller = require('./controller')

    //Criar um novo perfil de usuário
    app.post('/profile', controller.create)

    //Busca todos os perfis de usuário
    app.get('/profile', auth.verifyUser, controller.findAll)

}