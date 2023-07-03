const Sequelize = require('sequelize');

class Foto extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
      },
      filename: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}

module.exports = Foto;
