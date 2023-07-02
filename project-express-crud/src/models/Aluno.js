const Sequelize = require('sequelize');

class Aluno extends Sequelize.Model {
  static init(sequelize) {
    super.init({
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
      sequelize,
      modelName: 'aluno',
      timestamps: false,
    });
    return this;
  }
}

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
