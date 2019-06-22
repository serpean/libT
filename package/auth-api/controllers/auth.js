const AppApi = require('../util/appApi');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

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
    user.username = req.body.username;
    user.name = req.body.name;
    await user.setPassword(req.body.password);

    const token = user.generateJWT();
    // TODO: si va la primera per no la segunda?

    await libraryBuilder(
      'Want it',
      `${req.body.username} want it list`,
      1,
      req.body.username,
      token
    );
    await libraryBuilder(
      'In progress',
      `${req.body.username} in progress list`,
      2,
      req.body.username,
      token
    );
    await libraryBuilder(
      'Done',
      `${req.body.username} done list`,
      3,
      req.body.username,
      token
    );

    const userSaved = await user.save();

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

const libraryBuilder = async (name, description, type, user, token) => {
  // Ir al endpoint
  return AppApi.post(
    '/api/lists',
    {
      title: name,
      type: type,
      creator: user,
      public: true,
      description: description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};
