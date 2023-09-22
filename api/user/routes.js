module.exports = (app) => {

    const controller = require('./controller')

    //Criar um novo usuário
    app.post('/user', controller.create)

    //Busca todos os usuários
    app.get('/user', controller.findAll)

    app.get('/user/:userId', controller.findUnique)

    app.post('/login', controller.login)

    app.post('/logout', controller.logout)

    app.delete('/user/:id', controller.delete)

}