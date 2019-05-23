const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  searchId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  authors: [
    {
      type: String
    }
  ],
  publishDate: {
    type: String,
    required: true
  },
  publisher: {
    type: String
  },
  isbn: {
    type: String
  },
  image: {
    type: String
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List'
    }
  ],
  review: {
    type: String
  },
  stars: {
    type: Number
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  times: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TimeUse'
    }
  ]
});

module.exports = mongoose.model('Info', infoSchema);
