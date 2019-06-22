const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    searchId: {
      type: String,
      required: true
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'List'
      }
    ],
    actualState: {
      default: 0,
      type: Number
    },
    review: {
      type: String
    },
    stars: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5]
    },
    creator: {
      type: String,
      required: true
    },
    times: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TimeUse'
      }
    ]
  },
  { timestamps: true }
);

infoSchema.methods.addList = function(listId) {
  if (this.lists.indexOf(listId) === -1) {
    this.lists.push(listId);
  }

  return this.save();
};
// TODO: desacoplar en remove resource y remove list
infoSchema.methods.removeList = function(listId) {
  if (this.lists.indexOf(listId) !== -1) {
    this.lists.remove(listId);
  }
  return this.save();
};

infoSchema.methods.setActualState = function(actualState) {
  this.actualState = actualState;
  return this.save();
};

module.exports = mongoose.model('Info', infoSchema);
