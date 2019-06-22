const { validationResult } = require('express-validator/check');

const List = require('../models/list');

exports.getLists = async (req, res, next) => {
  try {
    const lists = await List.find({ creator: req.params.username })

    if (!lists) {
      const error = new Error('Not lists for this user');
      throw error;
    }
    res.status(200).json(
      lists.map(list => {
        return { ...list._doc, __v: undefined };
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
      'resources'
    );
    if (!list) {
      const error = new Error('List cannot be found.');
      throw error;
    }
    res.status(200).json({...list._doc});
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
  if(req.body.type) {
    const validList = await List.findOne({ creator: req.userId, type: req.body.type})
    if(validList !== null) {
      const error = new Error('You cannot create this type of list.');
      error.statusCode = 403;
      throw error;
    }
  }
  const list = new List({
    name: req.body.title,
    description: req.body.description,
    public: req.body.public,
    creator: req.userId,
    type: req.body.type || 0
  });
  try {
    await list.save();
    res.status(201).json({
      message: 'List create successfully.',
      list: list
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
