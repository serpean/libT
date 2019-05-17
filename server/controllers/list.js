const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const List = require('../models/list');

exports.getLists = async (req, res, next) => {
  try {
    const user = User.findOne({ username: req.param.username }).populate(
      'lists'
    );

    res.status(200).json(user.lists);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const list = new List({
    name: req.body.title,
    description: req.body.description,
    creator: req.userId
  });
  try {
    await list.save();
    const user = User.findById(req.userId);
    user.lists.push(list);
    await user.save();
    res.status(201).json({
      message: 'List create successfully.',
      list: list,
      creator: { _id: user._id.toString(), username: user.username }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
