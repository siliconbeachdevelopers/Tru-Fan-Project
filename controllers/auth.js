const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
  res.render('login.ejs')
})

router.post('/login', async (req, res) => {
  
  try {
    const foundUser = await User.findOne({
      email: req.body.email
    });
    if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {

        req.session.loggedIn = true;
        req.session.userId = foundUser._id
        res.redirect('/users/show.ejs');
      } else {
        // if the passwords don't match 
        res.redirect('/auth/login');
      }

    } else {
      // if the passwords don't match
      res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err)
  }

});

router.post('/registration', async (req, res) => {
  // first thing to do is hash the password
  const password = req.body.password; // the password from the form
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))


  const userDbEntry = {};
  // right side of these are the info from the form
  ///and our hashed password not the password from the form
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  userDbEntry.email = req.body.email;

  // added the user to the db
  const createdUser = await User.create(userDbEntry);
  req.session.username = createdUser.username;
  req.session.userId = createdUser._id
  req.session.logged = true;

  res.redirect('/users/new')

})

module.exports = router