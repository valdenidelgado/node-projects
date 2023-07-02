const router = require('express').Router();
const tokenController = require('../controllers/tokenController');

router.post('/', tokenController.store);

module.exports = router;
