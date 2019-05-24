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
    type: String
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

infoSchema.methods.addList = function(listId) {
  if (this.lists.indexOf(listId) === -1) {
    console.log('ADDED LIST' + listId);
    this.lists.push(listId);
  }

  return this.save();
};
// TODO: desacoplar en remove resource y remove list
infoSchema.methods.removeList = function(listId) {
  if (this.lists.indexOf(listId) !== -1) {
    console.log('REMOVED LIST' + listId);
    this.lists.remove(listId);
  }
  return this.save();
};

module.exports = mongoose.model('Info', infoSchema);
