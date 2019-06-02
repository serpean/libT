const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const { newError } = require('../util/errorHandler');

exports.getUser = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username }).populate(
      'lists followers following'
    );

    if (user === null) {
      const error = new Error('Not user found!');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ user: user.toProfileJSONFor() });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const username = req.params.username;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const newUsername = req.body.username;
    const bio = req.body.bio;
    let imageUrl = req.body.image;
    if (req.file) {
      imageUrl = req.file.path;
    }
    if (!imageUrl) {
      const error = new Error('No file picked');
      error.status = 422;
      throw error;
    }
    const userPromise = User.findOne({ username: username });
    const newUserPromise = User.findOne({ username: newUsername });

    const [user, newUser] = await Promise.all([userPromise, newUserPromise]);

    if (user === null) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    } else if (newUser !== null && newUser._id.toString() !== req.userId) {
      const error = new Error('The username already exist.');
      error.statusCode = 401;
      throw error;
    } else if (user._id.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    if (!imageUrl && imageUrl != user.image) {
      clearImage(user.image);
    }
    user.username = newUsername;
    user.bio = bio;
    if (imageUrl !== 'undefined') user.image = imageUrl;

    const result = await user.save();
    res
      .status(200)
      .json({ message: 'User updated!', user: result.toProfileJSONFor() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.followUser = async (req, res, next) => {
  const username = req.params.username;

  try {
    const userPromise = User.findById(req.userId);
    const userToFollowPromise = User.findOne({ username: username });

    const [user, userToFollow] = await Promise.all([
      userPromise,
      userToFollowPromise
    ]);

    if (user._id === userToFollow._id)
      newError(403, 'You cannot follow yourself');

    let result;

    if (user.isFollowing(userToFollow.id)) {
      result = await user.follow(userToFollow.id);
    } else {
      result = await user.unfollow(userToFollow.id);
    }

    res.status(200).json({
      message: user.isFollowing(userToFollow.id) ? 'follow' : 'unfollow',
      user: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = filePath => {
  if (filePath) {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  } else {
    console.error('Path is undefined!');
  }
};
