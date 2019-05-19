const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0
  },
  public: {
    type: Boolean,
    default: true
  },
  exclusive: {
    type: Boolean,
    default: false
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('List', listSchema);
