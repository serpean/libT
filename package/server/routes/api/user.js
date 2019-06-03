const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../../middleware/is-auth');
const userController = require('../../controllers/user');

const router = express.Router();

router.get('/:username', userController.getUser);

router.put(
  '/:username',
  isAuth,
  [
    body('username')
      .trim()
      .isLength({ min: 3 }),
    body('bio')
      .trim()
      .isLength({ min: 3 })
  ],
  userController.updateUser
);

router.put('/follow/:username', isAuth, userController.followUser);

router.get('/follow/:username', isAuth, userController.isFollowing);

module.exports = router;
