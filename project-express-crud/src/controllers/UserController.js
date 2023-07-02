const user = require('../models/User');

class UserController {
  async store(req, res) {
    const { nome, email, password } = req.body;
    try {
      const userCreated = await user.create({ nome, email, password });
      res.status(201).json(userCreated);
    } catch (error) {
      res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await user.findAll({ attributes: ['id', 'nome', 'email'] });
      res.json(users);
    } catch (error) {
      res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id, nome, email } = await user.findByPk(req.params.id);
      res.json({ id, nome, email });
    } catch (error) {
      res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const userById = await user.findByPk(req.userId);
      if (!userById) {
        res.status(400).json({ errors: ['Usuário não existe'] });
      }
      const { id, nome, email } = await userById.update(req.body);
      res.json({ id, nome, email });
    } catch (error) {
      res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const userById = await user.findByPk(id);
      if (!userById) {
        res.status(400).json({ errors: ['Usuário não existe'] });
      }
      await userById.destroy();
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

module.exports = new UserController();
