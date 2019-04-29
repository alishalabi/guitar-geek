const mongoose = require('mongoose')

const Song = mongoose.model('Song', {
  title: String,
  youtubeUrl: String,
  tabUrl: String
})

module.exports = Song;
