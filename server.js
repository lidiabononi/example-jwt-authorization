require('./api/configs/environment');

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./api/configs/sequelize');


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

require('./api/profile/routes')(app);
require('./api/user/routes')(app);
require('./api/user-profile/routes')(app);

db.sync();

var server = app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 no host " + server.address.address)
})