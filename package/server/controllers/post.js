const User = require('../models/user');
const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const maxResults = req.query.maxResults || 10;
    const user = await User.findById(req.userId);
    const totalItemsPromise = Post.find({
      creator: { $in: [...user.followed, user.id] }
    })
      .countDocuments()
      .exec();
    const postsPromise = Post.find({
      creator: { $in: [...user.followed, user.id] }
    })
      .skip((currentPage - 1) * maxResults)
      .limit(maxResults)
      .populate('resource')
      .populate('creator')
      .sort('-createdAt')
      .exec();

    const [totalItems, posts] = await Promise.all([
      totalItemsPromise,
      postsPromise
    ]);
    res.json({
      totalPosts: totalItems,
      posts: posts.map(post => {
        return {
          ...post._doc,
          creator: post.creator.username,
          resource: {
            ...post._doc.resource._doc,
            creator: post.creator.username
          }
        };
      })
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
