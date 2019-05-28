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
      .exec();

    const [totalItems, posts] = await Promise.all([
      totalItemsPromise,
      postsPromise
    ]);
    res.json({
      totalPosts: totalItems,
      posts: posts.map(post => {
        console.log(post.creator);
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

  // res.json({
  //   posts: [
  //     {
  //       action: 2,
  //       optionalContent: '',
  //       resource: {
  //         type: 'book',
  //         title: 'Harry Potter',
  //         author: 'J.K Rolling',
  //         image:
  //           'https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png',
  //         description: 'The first book on Harry potter saga',
  //         lists: ['3'],
  //         status: 0,
  //         starts: 0
  //       },
  //       creator: 'serpean'
  //     },
  //     {
  //       action: 1,
  //       resource: {
  //         type: 'movie',
  //         title: 'Rolling',
  //         author: 'someone',
  //         description: 'Roolling roooooling',
  //         image:
  //           'https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png',
  //         lists: ['3']
  //       },
  //       creator: 'serpean',
  //       status: 0,
  //       stars: 0
  //     }
  //   ]
  // });
};
