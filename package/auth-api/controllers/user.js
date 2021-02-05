const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const { newError } = require('../../server/util/errorHandler');

exports.getUser = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username })
      .populate('lists')
      .populate('followers', 'username image')
      .populate('following', 'username image');

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

exports.getFollowers = async (req, res, next) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({username: username}).populate("followers", "username image");
    console.log(user.followers)
    return res.json({followers: user.followers})
  }catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

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
    const name = req.body.name;
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
    } else if (newUser !== null && newUser.username.toString() !== req.userId) {
      const error = new Error('The username already exist.');
      error.statusCode = 401;
      throw error;
    } else if (user.username.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    if (!imageUrl && imageUrl != user.image) {
      clearImage(user.image);
    }
    user.username = newUsername;
    user.name = name;
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
  const username = req.body.username;
  try {
    const sourceUserPromise = User.findById(req.userId);
    const targetUserPromise = User.findOne({ username: username });

    const [sourceUser, targetUser] = await Promise.all([
      sourceUserPromise,
      targetUserPromise
    ]);

    if (sourceUser._id === targetUser._id)
      newError(403, 'You cannot follow yourself');

    let sourceUserResult, targetUserResult;

    if (!sourceUser.isFollowing(targetUser.id)) {
      [sourceUserResult, targetUserResult] = await follow(
        sourceUser,
        targetUser
      );
    } else {
      [sourceUserResult, targetUserResult] = await unfollow(
        sourceUser,
        targetUser
      );
    }
    const isFollowing = sourceUserResult.isFollowing(targetUserResult.id);
    res.status(200).json({
      message: `Now, you ${isFollowing ? 'follow' : 'unfollow'} ${username}`,
      isFollowing: isFollowing
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.isFollowing = async (req, res, next) => {
  const username = req.params.username;

  try {
    const targetUser = await User.findOne({ username: username });

    if (req.userId === targetUser.username.toString())
      newError(403, 'You cannot follow yourself');

    res.status(200).json({
      isFollowing: targetUser.followers.some(
        item => item.username.toString() === req.userId
      )
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const follow = (sourceUser, targetUser) => {
  if (sourceUser.following.indexOf(targetUser.id.toString()) === -1) {
    const updateFollowingList = [...sourceUser.following];
    updateFollowingList.push(targetUser.id.toString());
    sourceUser.following = updateFollowingList;
  }
  if (targetUser.followers.indexOf(sourceUser.id.toString()) === -1) {
    const updateFollowersList = [...targetUser.followers];
    updateFollowersList.push(sourceUser.id.toString());
    targetUser.followers = updateFollowersList;
  }
  return Promise.all([sourceUser.save(), targetUser.save()]);
};

const unfollow = (sourceUser, targetUser) => {
  if (sourceUser.following.indexOf(targetUser.id.toString()) !== -1) {
    const updateFollowingList = sourceUser.following.filter(
      item => item.toString() !== targetUser.id.toString()
    );
    sourceUser.following = updateFollowingList;
  }
  if (targetUser.followers.indexOf(sourceUser.id.toString()) !== -1) {
    const updateFollowersList = targetUser.followers.filter(
      item => item.toString() !== sourceUser.id.toString()
    );
    targetUser.followers = updateFollowersList;
  }
  return Promise.all([sourceUser.save(), targetUser.save()]);
};

const clearImage = filePath => {
  if (filePath) {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  } else {
    console.error('Path is undefined!');
  }
};
