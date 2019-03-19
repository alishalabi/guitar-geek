// Requiring Middleware
const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")


// Instantiate Express (Must be after middleware requirements)
const app = express()

// Integrating Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Render Root Route
app.get("/", (req, res) => {
  res.render("homepage")
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
