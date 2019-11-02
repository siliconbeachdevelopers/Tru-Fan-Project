const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
// setup the data connection in our main server
// file, server.js is executed by node, and all files

// will be linked to this
require('./db/db');

app.use(session({
  secret: "this is a random secret string", // is the key that opens up our session
  // which is always stored on the server
  resave: false, // only save our session when we add/or mutate
  // a property
  saveUninitialized: false // only save the cookie when
  // we add a property to it, When the user logs in or registers
  // we only really want to add stuff to our session after user
  // logs in or registers to comply with the law
}));

app.use(express.static('public'))
app.use(methodOverride('_method')); //must come before our routes
app.use(bodyParser.urlencoded({
  extended: false
}));

const authController = require('./controllers/auth')
app.use('/auth', authController)

const teamsController = require('./controllers/team')
app.use('/teams', teamsController);


const usersController = require('./controllers/user');
app.use('/users', usersController);

// home page
app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.listen(3020, () => {
  console.log('server lisenting on port', 3020);
});