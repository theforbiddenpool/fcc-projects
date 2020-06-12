const pads = document.querySelectorAll('.drum-pad')
const display = document.querySelector('#display h2')

window.addEventListener('keydown', playWhenKeyPressed)
pads.forEach(pad => pad.addEventListener('click', playWhenClicked))

function playWhenKeyPressed(e) {
  const pressedKey = e.key.toUpperCase()

  playSound(pressedKey)
}

function playWhenClicked(e) {
  const clickedKey = e.currentTarget.innerText

  playSound(clickedKey)
}

function playSound(pressedKey) {
  const audio = getAudioElement(pressedKey)

  if(audio == null) return
  setDisplayText(audio)

  audio.currentTime = 0
  audio.play()
}

function getAudioElement(code) {
  return document.querySelector(`#${code}`)
}

function setDisplayText(audio) {
  display.textContent = audio.parentNode.id
}
