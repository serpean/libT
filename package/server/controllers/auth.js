const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const List = require('../models/list');

exports.signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errors = new Error('Validation failed.');
    errors.statusCode = 422;
    errors.data = error.array();
    throw errors;
  }

  try {
    const user = new User();
    user.email = req.body.email;
    user.username = req.body.name;
    await user.setPassword(req.body.password);
    const userSaved = await user.save();

    const wantedList = await libraryBuilder(
      'Want it',
      `${userSaved.username} want it list`,
      1,
      user
    );
    await userSaved.addList(wantedList.id);
    const inProgressList = await libraryBuilder(
      'In progress',
      `${userSaved.username} in progress list`,
      2,
      user
    );
    await userSaved.addList(inProgressList.id);
    const doneList = await libraryBuilder(
      'Done',
      `${userSaved.username} done list`,
      3,
      user
    );
    await userSaved.addList(doneList.id);

    res.status(201).json({
      message: 'User created!',
      user: userSaved.toAuthJSON()
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await user.validPassword(req.body.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ user: user.toAuthJSON() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const libraryBuilder = async (name, description, type, user) => {
  const list = new List({
    name: name,
    type: type,
    exclusive: true,
    creator: user.id,
    description: description
  });
  return list.save();
};
