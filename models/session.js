const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  type: String
});

sessionSchema.set('toObject', {
  transform: function(doc, ret, options) {
    return {
      _id: ret._id,
      type: ret.type
    }
  }
});

module.exports = new mongoose.model('Session', sessionSchema);
