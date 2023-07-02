const express = require('express');
const routerHome = require('./routes/home');
const routerUser = require('./routes/userRoute');
const routerToken = require('./routes/tokenRoute');
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
    this.app.use('/tokens/', routerToken);
  }

  sqlite() {
    db.sync().then(() => {
      console.log('Database connected');
    });
  }
}

module.exports = new App().app;
