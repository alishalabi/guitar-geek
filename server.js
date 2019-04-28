// Requiring Middleware
const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const pitchy = require("pitchy")
const bodyParser = require('body-parser')


// Instantiate Express (Must be after middleware requirements)
const app = express()

// Integrating Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
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
    })
    .catch(err => {
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
    res.redirect('/songs');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
