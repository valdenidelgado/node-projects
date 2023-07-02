const { Sequelize } = require('sequelize');
const Aluno = require('../models/Aluno');
const User = require('../models/User');

const models = [Aluno, User];

const sequelize = new Sequelize('crud-db', null, null, {
  dialect: 'sqlite',
  storage: './src/db/app.db',
});

models.forEach((model) => model.init(sequelize));

module.exports = sequelize;
