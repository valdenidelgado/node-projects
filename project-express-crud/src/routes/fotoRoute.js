const router = require('express').Router();
const fotoController = require('../controllers/fotoController');
const login = require('../middlewares/loginRequired');

router.post('/', login, fotoController.store);

module.exports = router;
