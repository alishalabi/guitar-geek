const Song = require('../models/song')

module.exports = function(app) {

  // HTTP: Song Index
  app.get('/songs', (req, res) => {
    Song.find()
      .then(songs => {
        res.render('songs-index', { songs: songs });
      }).catch(err => {
        console.log(err);
      })
  })

  // HTTP: New Song Form
  app.get('/songs/new', (req, res) => {
    res.render('songs-new', {});
  })

  // HTTP: Create New Song
  app.post('/songs', (req, res) => {
    Song.create(req.body).then((song) => {
      console.log(song);
      res.redirect(`/songs/${song._id}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // HTTP: Show One Song
  app.get('/songs/:id', (req, res) => {
    Song.findById(req.params.id)
      .then((song) => {
        res.render('songs-show', {song: song})
      }).catch((err) => {
        console.log(err.message)
      })
  })

  // HTTP: Edit Song Form
  app.get('/songs/:id/edit', (req, res) => {
    Song.findById(req.params.id, function(err, song) {
      res.render('songs-edit', {song: song});
    })
  })

  // HTTP: Update Song
  app.put('/songs/:id', (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/songs/${song._id}`)
      }).catch(err => {
        console.log(err.message)
      })
  })

  // HTTP: Delete Song
  app.delete('/songs/:id', function (req, res) {
    console.log("DELETE song")
    Song.findByIdAndRemove(req.params.id).then((song) => {
      res.redirect('/songs');
    }).catch((err) => {
      console.log(err.message);
    })
  })

}
