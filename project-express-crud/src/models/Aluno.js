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
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}

module.exports = Aluno;
