const router = require('express').Router();
const fotoController = require('../controllers/fotoController');

router.post('/', fotoController.store);

module.exports = router;
