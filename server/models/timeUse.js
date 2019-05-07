const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeUseSchema = new Schema({
  startDate: {
      type: Date,
      required: true
  },
  endDate: {
      type: Date
  },
  progress: {
      type: String
  },
  info: {
    type: Schema.Types.ObjectId,
    ref: 'Info'
  }
});

module.exports = mongoose.model('TimeUse', timeUseSchema);
