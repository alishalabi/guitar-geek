
import { findPitch } from "/web_modules/pitchy.js"

const displayPitch = document.getElementById('pitch')
const displayClarity = document.getElementById('clarity')
displayPitch.style.height = '100px'
// displayPitch.style.backgroundColor = 'green'

displayClarity.style.height = '100px'
// displayClarity.style.backgroundColor = 'blue'

// Used to optimize sample rate
const sampleRateModifier = 10

function updatePitch(analyserNode, sampleRate) {
  let data = new Float32Array(analyserNode.fftSize)
  analyserNode.getFloatTimeDomainData(data)
  let [pitch, clarity] = findPitch(data, sampleRate)


  displayPitch.textContent = String(pitch)
  displayPitch.style.width = `${pitch}px`
  displayPitch.style.backgroundColor = `rgb(0, ${pitch}, 0)`

  displayClarity.textContent = String(clarity)
  displayClarity.style.width = `${clarity}px`
  displayClarity.style.backgroundColor = `rgb(${clarity}, 0, 0)`


  window.requestAnimationFrame(() => updatePitch(analyserNode, sampleRate))

  // console.log(data)
  // console.log(pitch)
  // console.log(clarity)

}

document.addEventListener("DOMContentLoaded", () => {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)()
  let analyserNode = audioContext.createAnalyser()

  navigator.mediaDevices.getUserMedia({ audio: true}).then((stream) => {
    let sourceNode = audioContext.createMediaStreamSource(stream)
    sourceNode.connect(analyserNode)
    updatePitch(analyserNode, audioContext.sampleRate/sampleRateModifier)
  })
})
