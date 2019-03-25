// Visualization inspired by: https://www.youtube.com/watch?v=QWbdYmeAQEY
// Microphone object inspired by: https://air.ghost.io/recording-to-an-audio-file-using-html5-and-js/


var analyser, canvas, ctx;

window.onload = function() {
  canvas = document.createElement("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  ctx = canvas.getContext("2d")

  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
  });
    // setupWebAudio();
    draw()
}

function setupWebAudio() {
  const audioEl = document.createElement('audio');
  // const sourceEl = document.createElement('source');
  // sourceEl.src = blobUrl;
  // sourceEl.type = 'audio/webm';
  // audioEl.appendChild(sourceEl);
  document.body.appendChild(audioEl);

  const audioContext = new AudioContext()
  analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaElementSource(audioEl)
  source.connect(analyser)
  analyser.connect(audioContext.destination)

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
