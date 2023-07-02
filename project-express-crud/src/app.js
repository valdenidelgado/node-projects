const express = require('express');
const router = require('./routes/home');
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
    this.app.use('/', router);
  }

  sqlite() {
    db.sync().then(() => {
      console.log('Database connected');
    });
  }
}

module.exports = new App().app;
