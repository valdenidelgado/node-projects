const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud-db', null, null, {

  dialect: 'sqlite',
  storage: './src/db/app.db',
});

module.exports = sequelize;
