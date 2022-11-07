const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;