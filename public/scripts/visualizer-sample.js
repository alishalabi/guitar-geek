// Visualization inspired by: https://www.youtube.com/watch?v=QWbdYmeAQEY

var analyser, canvas, ctx;


window.onload = function() {
  canvas = document.getElementById("visualizer-canvas")
  console.log(canvas)
  canvas.width = window.innerWidth
  canvas.height = "500"
  // document.body.appendChild(canvas)
  ctx = canvas.getContext("2d")

  setupWebAudio()
  draw()
}

function setupWebAudio() {
  const audio = document.createElement("audio")
  audio.src = "/assets/accoustic-guitar.mp3"
  audio.controls = "true"
  document.body.appendChild(audio)
  audio.style.width = window.innerWidth + "px"

  const audioContext = new AudioContext()
  analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)
  // const promise = audio.play()
  // if (promise !== undefined) {
  //    promise.then(_ => {
  //    // Autoplay started!
  //    }).catch(error => {
  //       // Autoplay was prevented.
  //       // Show a "Play" button so that user can start playback.
  //   });
  // }

}

function draw() {
  requestAnimationFrame(draw);
  const freqByteData = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(freqByteData)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (var i = 1; i < freqByteData.length; i += 10) {
    let random = Math.random,
    red = random() * 255 >> 0,
    green = random() * 255 >> 0,
    blue = random() * 255 >> 0;

    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")"
    ctx.fillRect(i, canvas.height - freqByteData[i]*2, 10, canvas.height)
    ctx.strokeRect(i, canvas.height - freqByteData[i]*2, 10, canvas.height)


  }
}
