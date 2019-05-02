const User = require('../models/user')

module.exports = function(app) {

  // HTTP: Song Index
  app.get('/users', (req, res) => {
    User.find()
      .then(users => {
        res.render('user-index', { users: users });
      }).catch(err => {
        console.log(err);
      })
  })

  // HTTP: New Song Form
  app.get('/users/new', (req, res) => {
    res.render('user-new', {});
  })

  // HTTP: Create New Song
  app.post('/users', (req, res) => {
    User.create(req.body).then((user) => {
      console.log(user);
      res.redirect(`/user/${user._id}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // HTTP: Show One Song
  app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
      .then((song) => {
        res.render('users-show', {user: user})
      }).catch((err) => {
        console.log(err.message)
      })
  })

  // HTTP: Edit Song Form
  app.get('/users/:id/edit', (req, res) => {
    User.findById(req.params.id, function(err, user) {
      res.render('users-edit', {user: user});
    })
  })

  // HTTP: Update Song
  app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        res.redirect(`/users/${user._id}`)
      }).catch(err => {
        console.log(err.message)
      })
  })

  // HTTP: Delete Song
  app.delete('/users/:id', function (req, res) {
    console.log("DELETE song")
    User.findByIdAndRemove(req.params.id).then((user) => {
      res.redirect('/users');
    }).catch((err) => {
      console.log(err.message);
    })
  })

}
