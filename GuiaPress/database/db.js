const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;