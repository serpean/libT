const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  followed: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  lists: [
    {
        type: Schema.Types.ObjectId,
        ref: 'List'
      }
  ]
});

module.exports = mongoose.model('User', userSchema);
