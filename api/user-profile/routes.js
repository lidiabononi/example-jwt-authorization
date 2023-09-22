module.exports = (app) => {

    const controller = require('./controller')

    //Criar um novo perfil de usuário
    app.post('/user-profile', controller.create)

    //Busca todos os perfis de usuário
    app.get('/user-profile', controller.findAll)

    app.get('/user-profile/:userId', controller.findByUserId)

}