// Tests inspired by Make School's Rotten Potatoes Tutorial - https://www.makeschool.com/academy/track/rotten-potatoes---movie-reviews-with-express-js

const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../app")
const should = chai.should()
const Song = require("..models/song")

const sampleSong = {
    title: "Sweet Caroline",
    youtubeUrl: "https://www.youtube.com/watch?v=FIp5LvdZvwk",
    tabUrl: "https://tabs.ultimate-guitar.com/tab/neil_diamond/sweet_caroline_tabs_112718"
}

chai.use(chaiHttp)

describe("Songs", () => {

  // Data Cleanup
  after(() => {
    Song.deleteMany({title: "Sample Song"})
      .exec((err, songs) => {
        console.log(songs)
        songs.remove()
      })
  })

  // Test: Index
  it("should index ALL songs on /songs GET", (done) => {
    // Access your server through chai-http
    chai.request(server)
      // Attempt a GET request (index)
      .get("/songs")
      // Once GET request is complete, wait for response
      .end((err, res) => {
        // Check that our desired response code is returned (200)
        res.should.have.status(200)
        // Check to ensure that our response is html (best practice)
        res.should.be.html
        // End test, report result
        done()
      })
  })

  // Test: New (Form)
  it("should display new song form on /songs/new GET"), (done) => {
    chai.request(server)
      .get(`/songs/new`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
  }
  // Test: Create
  it("should show a SINGLE song on /songs/<id> GET", (done) => {
    const song = new Song(sampleSong)
      song.save((err, data) => {
        chat.request(server)
          .get(`/songs/${data._id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
          })
      })
  })

  // Test: Edit (Form)
  it("should edit a SINGLE song on /songs/<id>/edit GET", (done) => {
    const song = new Song(sampleSong)
      song.save((err, data) => {
        chat.request(server)
          .get(`/songs/${data._id}/edit`)
          .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
          })
      })
  })

  // Test: Update
  it("should update a SINGLE song on /songs/<id>/edit PUT", (done) => {
    const song = new Song(sampleSong)
      song.save((err, data) => {
        chat.request(server)
          .put(`/songs/${data._id}?_method=PUT`)
          .send({"tittle": "Updating the title"})
          .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
          })
      })
  })

  // Test: Delete
  it("should delete a SINGLE song on /songs/<id>/edit DELETE", (done) => {
    const song = new Song(sampleSong)
      song.save((err, data) => {
        chat.request(server)
          .delete(`/songs/${data._id}?_method=DELETE`)
          .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
          })
      })
  })
})
