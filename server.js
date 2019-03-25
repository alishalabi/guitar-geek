// Requiring Middleware
const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const pitchy = require("pitchy")


// Instantiate Express (Must be after middleware requirements)
const app = express()

// Integrating Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
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
  // res.render("visualizer")
  res.render("visualizer-sample")
})

app.get("/sheet", (req, res) => {
  res.render("sheet")
})

app.get("/sandbox", (req, res) => {
  res.render("sandbox")
})

app.get("/visualizer-sample", (req, res) => {
  res.render("visualizer-sample")
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
