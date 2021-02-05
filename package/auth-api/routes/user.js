const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../../server/middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

// /followers/:username
router.get('/followers/:username', isAuth, userController.getFollowers);

// /follow/:username
router.get('/follow/:username', isAuth, userController.isFollowing);

// /follow/
router.put('/follow', isAuth, userController.followUser);

// /:username
router.get('/:username', userController.getUser);

// /:username
router.put(
  '/:username',
  isAuth,
  [
    body('username')
      .trim()
      .isLength({ min: 3 }),
    body('name')
      .isString()
      .trim()
      .isLength({ min: 3 }),
    body('bio')
      .trim()
      .isLength({ min: 3 })
  ],
  userController.updateUser
);

module.exports = router;
