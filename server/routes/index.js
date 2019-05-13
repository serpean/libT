var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Welcome');
});

router.get('/posts', (req, res, next) => {
  res.json({
    posts: [
      {
        action: 2,
        resource: {
          type: 'book',
          title: 'Harry Potter',
          author: 'J.K Rolling',
          image:
            'https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png',
          description: 'The first book on Harry potter saga'
        },
        lists: ['3'],
        review: 'Awesome',
        stars: 3,
        creator: {
          name: 'Sergio'
        },
        lastState: 'D'
      },
      {
        action: 1,
        resource: {
          type: 'movie',
          title: 'Rolling',
          author: 'someone',
          description: 'Roolling roooooling',
          image:
            'https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png'
        },
        lists: ['3'],
        review: 'Toooo',
        stars: 3,
        creator: {
          name: 'Sergio'
        },
        lastState: 'D'
      }
    ]
  });
});

module.exports = router;
