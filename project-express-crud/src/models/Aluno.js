const Sequelize = require('sequelize');
const db = require('../db/conn');

class Aluno extends Sequelize.Model {}

Aluno.init({
  nome: {
    type: Sequelize.STRING,
  },
  sobrenome: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  idade: {
    type: Sequelize.INTEGER,
  },
  peso: {
    type: Sequelize.FLOAT,
  },
  altura: {
    type: Sequelize.FLOAT,
  },
}, {
  sequelize: db,
  modelName: 'aluno',
  timestamps: false,
});

module.exports = Aluno;

// const Aluno = db.define('aluno', {
//   nome: {
//     type: Sequelize.STRING,
//   },
//   sobrenome: {
//     type: Sequelize.STRING,
//   },
//   email: {
//     type: Sequelize.STRING,
//   },
//   idade: {
//     type: Sequelize.INTEGER,
//   },
//   peso: {
//     type: Sequelize.FLOAT,
//   },
//   altura: {
//     type: Sequelize.FLOAT,
//   },
// });

// module.exports = Aluno;
