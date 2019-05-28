const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/is-auth');
const postController = require('../../controllers/post');

router.get('/posts', isAuth, postController.getPosts);

module.exports = router;
