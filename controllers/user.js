const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Team = require('../models/team.js')


router.get('/', (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) {
      console.log(err)
    } else {
      res.render('users/index.ejs', {
        allUsers: allUsers
      })
    }
  })

})

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
})


router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      res.render('users/edit.ejs', {
        user: foundUser // foundAuthor is the response from the db
      })
    }
  })
})

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, updatedUser) => {
    if (err) {
      res.send(err)
    } else {
      res.redirect('/users/' + req.params.id)
    }
  })
})


// show route

router.get('/:id', async (req, res) => {
  console.log("this is the show route")
  const foundUser = await User.findById(req.params.id)
  const foundTeams = await Team.find({})
  const allUsers = await User.find({})
  try {
    res.render("users/show.ejs", {
      user: foundUser,
      team: foundTeams,
      allUsers: allUsers || null
    })

  } catch (err) {
    console.log(err)
  }

})
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/users') // if successful go back to the index
    }
  });
});





router.post('/', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.session.userId, req.body, {
      new: true
    })
    res.redirect('/teams/new')
  } catch (err) {
    console.log(err)
  }



})








module.exports = router;