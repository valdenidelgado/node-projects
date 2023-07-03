const express = require('express');
const routerHome = require('./routes/home');
const routerUser = require('./routes/userRoute');
const routerToken = require('./routes/tokenRoute');
const routerAluno = require('./routes/alunoRoute');
const routerFoto = require('./routes/fotoRoute');
const db = require('./db/conn');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.sqlite();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/', routerHome);
    this.app.use('/users/', routerUser);
    this.app.use('/alunos/', routerAluno);
    this.app.use('/tokens/', routerToken);
    this.app.use('/fotos/', routerFoto);
  }

  sqlite() {
    db.sync().then(() => {
      console.log('Database connected');
    });
  }
}

module.exports = new App().app;
