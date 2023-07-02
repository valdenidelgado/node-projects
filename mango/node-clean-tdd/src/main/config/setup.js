const cors = require('../middlewares/cors')
const jsonParser = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by');
  app.use(jsonParser);
  app.use(contentType)
  // app.use(express.urlencoded({ extended: false }));
  app.use(cors);
}