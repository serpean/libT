const router = require('express').Router();
const { body } = require('express-validator/check');

const listController = require('../../controllers/list');
const isAuth = require('../../middleware/is-auth');

router.get('/:username', isAuth, listController.getLists);

router.post(
  '/',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 3 }),
    body('description').trim()
  ],
  listController.createList
);

module.exports = router;
