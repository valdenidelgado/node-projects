const aluno = require('../models/Aluno');
const Foto = require('../models/Foto');
const upload = require('../config/multerConfig').single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ error: error.code });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        if (!aluno_id) {
          return res.status(400).json({ error: 'Aluno não informado' });
        }
        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.status(200).json(foto);
      } catch (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
    });
  }

  async update(req, res) {
    try {
      const { aluno_id } = req.params;
      const { originalname: name, filename: path } = req.file;

      const alunoEncontrado = await aluno.findByPk(aluno_id);

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      const foto = await alunoEncontrado.getFoto();

      await foto.update({ name, path });

      return res.status(200).json(foto);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { aluno_id } = req.params;

      const alunoEncontrado = await aluno.findByPk(aluno_id);

      if (!alunoEncontrado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      const foto = await alunoEncontrado.getFoto();

      await foto.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    try {
      const { aluno_id } = req.params;

      const alunoEncontrado = await aluno.findByPk(aluno_id, {
        attributes: ['id', 'nome', 'sobrenome', 'email'],
        include: {
          attributes: ['url', 'name', 'path'],
          association: 'fotos',
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

  async index(req, res) {
    try {
      const alunos = await aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email'],
        include: {
          attributes: ['url', 'name', 'path'],
          association: 'fotos',
        },
      });

      return res.status(200).json(alunos);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new FotoController();
