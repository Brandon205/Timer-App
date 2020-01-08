require('dotenv').config();
const mongoose = require('mongoose');
const sessionModel = require('./models/session');
const sessions = [
  {type: '2x2'},
  {type: '3x3'},
  {type: '4x4'},
  {type: '5x5'},
  {type: '6x6'},
  {type: '7x7'},
  {type: 'Megaminx'},
  {type: 'Pyraminx'},
  {type: 'Skewb'},
  {type: 'Square-1'},
  {type: 'Other'}
];

function seedSessions() {  
  sessions.forEach((session, id) => {
    sessionModel.create(session)
  });
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB database in seed file');
  return seedSessions();
});
