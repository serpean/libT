const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
  type: {
    type: String,
    enum: ["BOOK", "MOVIE", "GAME"],
    required: true
  },
  resource: {
    type: Object,
    required: true
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  review: {
      type: String
  },
  stars: {
      type: Number
  },
  times: [{
    type: Schema.Types.ObjectId,
    ref: 'TimeUse'
  }]
});

module.exports = mongoose.model('Info', infoSchema);
