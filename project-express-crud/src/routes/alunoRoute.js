const router = require('express').Router();
const alunoController = require('../controllers/alunoController');
const login = require('../middlewares/loginRequired');

router.get('/', alunoController.index);
router.post('/', login, alunoController.store);
router.get('/', login, alunoController.show);
router.put('/', login, alunoController.update);
router.delete('/', login, alunoController.delete);

module.exports = router;
