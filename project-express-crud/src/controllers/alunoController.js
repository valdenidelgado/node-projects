const aluno = require('../models/Aluno');
const Foto = require('../models/Foto');

class AlunoController {
  async store(req, res) {
    try {
      const {
        nome, sobrenome, email, idade, peso, altura,
      } = req.body;

      const novoAluno = await aluno.create({
        nome, sobrenome, email, idade, peso, altura,
      });

      return res.status(201).json(novoAluno);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async index(req, res) {
    try {
      const alunos = await aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      return res.status(200).json(alunos);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID não enviado' });
      }

      const alunoEncontrado = await aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      return res.status(200).json(alunoEncontrado);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        nome, sobrenome, email, idade, peso, altura,
      } = req.body;

      const alunoEncontrado = await aluno.findByPk(id);

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      const alunoAtualizado = await alunoEncontrado.update({
        nome, sobrenome, email, idade, peso, altura,
      });

      return res.status(200).json(alunoAtualizado);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const alunoEncontrado = await aluno.findByPk(id);

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      await alunoEncontrado.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async showName(req, res) {
    try {
      const { nome } = req.query;

      const alunoEncontrado = await aluno.findAll({
        where: {
          nome,
        },
      });

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      return res.status(200).json(alunoEncontrado);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async showEmail(req, res) {
    try {
      const { email } = req.query;

      const alunoEncontrado = await aluno.findAll({
        where: {
          email,
        },
      });

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      return res.status(200).json(alunoEncontrado);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new AlunoController();
