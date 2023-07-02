const router = require('express').Router();
const UserController = require('../controllers/UserController');
const loginMiddleware = require('../middlewares/loginRequired');

router.get('/', loginMiddleware, UserController.index);
router.get('/:id', UserController.show);

router.post('/', UserController.store);
router.put('/', loginMiddleware, UserController.update);
router.delete('/:id', loginMiddleware, UserController.delete);

module.exports = router;
