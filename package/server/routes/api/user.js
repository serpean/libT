const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../../middleware/is-auth');
const userController = require('../../controllers/user');

const router = express.Router();

// /api/user/follow/:username
router.get('/follow/:username', isAuth, userController.isFollowing);

// /api/user/follow/
router.put('/follow', isAuth, userController.followUser);

// /api/user/:username
router.get('/:username', userController.getUser);

// /api/user/:username
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

module.exports = router;
