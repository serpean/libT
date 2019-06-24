const router = require('express').Router();
const { body } = require('express-validator/check');

const infoController = require('../../controllers/info');
const isAuth = require('../../middleware/is-auth');

// /info
router.post('/', isAuth, infoController.createOrModifyResource);

// /info/status/:resourceId
router.get('/status/:resourceId', isAuth, infoController.getStatus);

module.exports = router;
