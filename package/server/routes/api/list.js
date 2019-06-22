const router = require('express').Router();
const { body } = require('express-validator/check');

const listController = require('../../controllers/list');
const isAuth = require('../../middleware/is-auth');

router.get('/user/:username', isAuth, listController.getLists);

router.get('/list/:listId', isAuth, listController.getList);

router.post(
  '/',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 3 }),
    body('description').trim(),
    body('public').isBoolean(),
    body('creator').trim()
  ],
  listController.createList
);

router.put(
  '/:listId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 3 }),
    body('description').trim(),
    body('public').isBoolean()
  ],
  listController.updateList
);

router.delete('/:listId', isAuth, listController.deleteList);

module.exports = router;
