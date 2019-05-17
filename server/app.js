const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-yylxr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(process.env.PORT || 3001);
    console.log('Server on!');
  })
  .catch(err => console.log(err));
