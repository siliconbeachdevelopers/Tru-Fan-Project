const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const User = require('../models/user')



router.get('/', (req, res) => {
  Team.find({}, (err, allTeams) => {
    if (err) {
      console.log(err)
    } else {
      res.render('teams/index.ejs', {
        teams: allTeams
      })
    }
  })

})



router.get('/new', (req, res) => {
  res.render('teams/new.ejs');
})


router.get('/:id/edit', (req, res) => {
  Team.findById(req.params.id, (err, foundTeam) => {
    if (err) {
      res.send(err);
    } else {
      res.render('teams/edit.ejs', {
        team: foundTeam // foundTeam is the response from the db
      })
    }
  })
})

router.put('/:id', async (req, res) => {
  try {
    const edits = {}
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, edits, {new: true})
    const foundUser = await User.findOne({'team': updatedTeam.team})
    if(req.body.image) {
      updatedTeam.image.push(req.body.image)
      updatedTeam.save()
    }
    res.redirect(`/users/${foundUser._id}`)
  } catch(err) {
    console.log(err)
  }
  // Team.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true
  // }, (err, updatedTeam) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.redirect('/teams/' + req.params.id)
  //   }
  // })
})


router.get('/:id', async (req, res) => {
  const foundUser = await User.findById(req.session.userId)
  const foundTeam = await Team.findOne({
    'team': foundUser.team
  })
  try {
    res.render("users/index.ejs", {
      user: foundUser,
      team: foundTeam
    })

  } catch (err) {
    console.log(err)
  }

})


router.get('/:id', (req, res) => {
  Team.findById(req.params.id, (err, foundteam) => {
    if (err) {
      res.send(err);
    } else {
      res.render('teams/show.ejs', {
        team: foundteams // foundTeam response from the db
        // team is the variable in show.ejs
      })
    }
  })
})



router.post('/', async (req, res) => {
  const newUser = await User.findById(req.session.userId);
  const allUsers = await User.find({})
  console.log(newUser, 'this is new user')


  Team.create(req.body, (err, createdTeam) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(createdTeam)
      User.findById(req.session.userId, (err, foundUser) => {
        if (err) {
          console.log(err)
        } else {
          res.render('users/show.ejs', {
            user: foundUser,
            team: createdTeam,
            allUsers: allUsers,

          })
          
        }
      })

    }
  })
})



module.exports = router;