const aluno = require('../models/Aluno');

class HomeController {
  async index(req, res) {
    const novoAluno = {
      nome: 'João',
      sobrenome: 'Silva',
      email: 'john@john.com',
      idade: 20,
      peso: 80.5,
      altura: 1.8,
    };

    const ne = await aluno.create(novoAluno);
    res.json(ne);
  }
}

module.exports = new HomeController();
