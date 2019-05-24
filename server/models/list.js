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
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Info'
    }
  ]
});

listSchema.methods.addResource = async function(infoId) {
  if (this.resources.indexOf(infoId) === -1) {
    console.log('ADDED INFO ' + infoId);
    this.resources.push(infoId);
  }
  return this.save();
};
// TODO: desacoplar en remove resource y remove list
listSchema.methods.removeResource = async function(infoId) {
  if (this.resources.indexOf(infoId) !== -1) {
    this.resources.remove(infoId);
    console.log('REMOVED INFO ' + infoId);
  }
  return this.save();
};

listSchema.methods.containsResource = function(resourceId) {
  const result = this.resourceId.find(e => e === resourceId);
  return result ? true : false;
};

module.exports = mongoose.model('List', listSchema);
