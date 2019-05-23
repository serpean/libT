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

listSchema.methods.addResource = async function(infoModel) {
  if (
    infoModel &&
    this.resources.indexOf(infoModel._id) === -1 &&
    infoModel.lists.indexOf(this._id) === -1
  ) {
    this.resources.push(infoModel._id);
    infoModel.lists.push(this._id);
    await infoModel.save();
  }

  return this.save();
};

listSchema.method.removeResouce = async function(infoModel) {
  if (
    infoModel &&
    this.resources.indexOf(infoModel._id) !== -1 &&
    infoModel.lists.indexOf(this._id) !== -1
  ) {
    this.resources.remove(infoModel._id);
    await infoModel.lists.remove(this._id);
  }
  return this.save();
};

listSchema.methods.containsResource = function(resourceId) {
  const result = this.resourceId.find(e => e === resourceId);
  return result ? true : false;
};

module.exports = mongoose.model('List', listSchema);
