const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['W', 'I', 'R', 'O'],
    default: 'O'
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
