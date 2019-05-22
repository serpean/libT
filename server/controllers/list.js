const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const List = require('../models/list');

exports.getLists = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      'lists'
    );
    if (!user) {
      const error = new Error('User cannot be found.');
      throw error;
    }
    res.status(200).json(
      user.lists.map(list => {
        return { ...list._doc, creator: user.username, __v: undefined };
      })
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getList = async (req, res, next) => {
  try {
    const list = await List.findOne({ _id: req.params.listId }).populate(
      'Info'
    );
    if (!list) {
      const error = new Error('List cannot be found.');
      throw error;
    }
    res.status(200).json(list);
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
    public: req.body.public,
    creator: req.userId
  });
  try {
    await list.save();
    const user = await User.findById(req.userId);
    user.lists.push(list);
    await user.save();
    res.status(201).json({
      message: 'List create successfully.',
      list: list,
      creator: user.username
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  try {
    const list = await List.findById(req.params.listId);
    if (list.creator.toString() !== req.userId || list.type !== 0) {
      const error = new Error('You cannot edit this list');
      error.statusCode = 403;
      throw error;
    }
    list.name = req.body.title;
    list.description = req.body.description;
    list.public = req.body.public;
    await list.save();
    res.status(200).json({
      message: 'List update successfully.',
      list: list
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  try {
    const list = await List.findById(req.params.listId);
    if (list.creator.toString() !== req.userId || list.type !== 0) {
      const error = new Error('You cannot delete this list');
      error.statusCode = 403;
      throw error;
    }
    const user = await User.findById(req.userId);
    await List.findByIdAndDelete(req.params.listId);
    user.lists.pull(req.params.listId);
    await user.save();
    res.status(200).json({
      message: 'List delete successfully.'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createItemList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  try {
    const listId = req.params.listId;
    const list = await List.findById(listId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deteleItemList = (req, res, next) => {};
