const router = require('express').Router();
const { body } = require('express-validator/check');

const infoController = require('../../controllers/info');
const isAuth = require('../../middleware/is-auth');

router.post('/', isAuth, infoController.createOrModifyResource);

module.exports = router;
