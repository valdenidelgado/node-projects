const express = require('express');
const app = express();
const setupApp = require('./setup');
const route = require('./route');

setupApp(app);
route(app);


module.exports = app