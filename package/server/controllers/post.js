const AuthApi = require("../util/authApi");

const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const maxResults = req.query.maxResults || 10;
    const followersRequest = await AuthApi.get(`/followers/${req.userId}`, {
      headers: {
        Authorization: `Bearer ${req.userToken}`
      }
    });
    const followers = followersRequest.data.followers;
    const totalItemsPromise = Post.find({
      creator: { $in: [...followers, req.userId] }
    })
      .countDocuments()
      .exec();
    const postsPromise = Post.find({
      creator: { $in: [...followers, req.userId] }
    })
      .skip((currentPage - 1) * maxResults)
      .limit(maxResults)
      .populate('resource')
      .sort('-createdAt')
      .exec();

    const [totalItems, posts] = await Promise.all([
      totalItemsPromise,
      postsPromise
    ]);
    res.json({
      totalPosts: totalItems,
      posts: posts
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
