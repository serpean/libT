const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const multer = require('multer');

const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '_') + '-' + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(logger('dev'));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRoutes);
// app.use('/api/feed');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  const message = err.message;
  const data = req.app.get('env') === 'development' ? err.data : {};

  // render the error page
  res.status(err.statusCode || 500).json({ message: message, data: data });
});

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(process.env.PORT || 3001);
    console.log('Server on!');
  })
  .catch(err => console.log(err));
