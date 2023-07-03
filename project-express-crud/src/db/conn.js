const { Sequelize } = require('sequelize');
const Aluno = require('../models/Aluno');
const User = require('../models/User');
const Foto = require('../models/Foto');

const models = [Aluno, User, Foto];

const sequelize = new Sequelize('crud-db', null, null, {
  dialect: 'sqlite',
  storage: './src/db/app.db',
});

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));

module.exports = sequelize;
