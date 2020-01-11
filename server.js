require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));
app.use(helmet());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => console.log(`Connected to MongoDB on ${db.host} at ${db.port}`));
db.on('error', (err) => console.log(`Database error: ${err}`));

app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true
}));

app.use('/auth', require('./routes/auth'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(process.env.PORT, () => console.log('Listening...'))