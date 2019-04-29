// Requiring Middleware
const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const pitchy = require("pitchy")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


// Instantiate Express (Must be after middleware requirements)
const app = express()

// Integrating Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/guitar-geek', { useNewUrlParser: true });


// Render Root Route
app.get("/", (req, res) => {
  res.render("homepage")
})

app.get("/tools", (req, res) => {
  res.render("tools")
})


app.get("/tuner", (req, res) => {
  res.render("tuner")
})

app.get("/visualizer", (req, res) => {
  res.render("visualizer-options")
  // res.render("visualizer-sample")
})

app.get("/visualizer-sample", (req, res) => {
  res.render("visualizer-sample")
})

app.get("/visualizer-record", (req, res) => {
  res.render("visualizer-record")
})

app.get("/visualizer-open", (req, res) => {
  res.render("visualizer-open")
})

// app.get("/sheet", (req, res) => {
//   res.render("sheet")
// })

// app.get("/sandbox", (req, res) => {
//   res.render("sandbox")
// })

// let songs = [
//   { title: "Wagon Wheel", youtubeUrl: "https://www.youtube.com/watch?v=zx3Tv5uBAaE"},
//   { title: "No Woman No Cry", youtubeUrl: "https://www.youtube.com/watch?v=7lasK3XSICc"}
// ]
const Song = mongoose.model('Song', {
  title: String,
  youtubeUrl: String,
  tabUrl: String
});

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

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
