const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    action: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'Info',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
