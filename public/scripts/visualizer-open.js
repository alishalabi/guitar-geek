// Visualization inspired by: https://www.youtube.com/watch?v=QWbdYmeAQEY
// Microphone object inspired by: https://air.ghost.io/recording-to-an-audio-file-using-html5-and-js/


var analyser, canvas, ctx;

window.onload = function() {
  canvas = document.createElement("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  ctx = canvas.getContext("2d")

  // request permission to access audio stream
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // store streaming data chunks in array
      const chunks = [];
      // create media recorder instance to initialize recording
      const recorder = new MediaRecorder(stream);
      // function to be called when data is received
      recorder.ondataavailable = e => {
        // add stream data to chunks
        chunks.push(e.data);
        // if recorder is 'inactive' then recording has finished
        if (recorder.state == 'inactive') {
            // convert blob to URL so it can be assigned to a audio src attribute

        }
      };
      // start recording with 1 second time between receiving 'ondataavailable' events
      recorder.start(1000);
      // setTimeout to stop recording after 4 seconds
    }).catch(console.error);
    setupWebAudio();
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
