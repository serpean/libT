var router = require('express').Router();

//router.use('/profiles', require('./profiles'));
router.use('/lists', require('./list'));
router.use('/posts', require('./post'));
router.use('/info', require('./info'));
router.use('/user', require('./user'));

module.exports = router;
