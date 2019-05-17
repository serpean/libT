var router = require('express').Router();

/* GET home page. */
router.use('/api', require('./api'));

module.exports = router;
