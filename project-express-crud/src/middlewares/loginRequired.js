const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const login = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      auth: false,
      message: 'Token não informado.',
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const data = jwt.verify(token, 'secret');

    const { id, email } = data;

    const user = await userModel.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        auth: false,
        message: 'Usuário não encontrado.',
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      auth: false,
      message: 'Token inválido.',
    });
  }
};

module.exports = login;
