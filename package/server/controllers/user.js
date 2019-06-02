const User = require('../models/user');

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
