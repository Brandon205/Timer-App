const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  time: String,
  dnf: { type: Boolean, default: false },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session'}
});

timeSchema.set('toObject', {
  transform: function(doc, ret, options) {
    return {
      _id: ret._id,
      time: ret.time,
      dnf: ret.dnf,
      session: ret.session,
      userId: ret.userId
    }
  }
})

module.exports = new mongoose.model('Time', timeSchema);
