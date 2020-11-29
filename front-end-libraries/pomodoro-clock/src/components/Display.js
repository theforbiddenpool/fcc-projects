import React from 'react'

export const Display = ({ label, secondsLeft }) => {
  function clockify(time = secondsLeft) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function formatForPreecidingZero(number) {
      return (number < 10) ? `0${number}` : number
    }

    return `${formatForPreecidingZero(minutes)}:${formatForPreecidingZero(seconds)}`
  }

  return (
    <div className="timer-display" aria-live="polite">
      <h2 id="timer-label">{ label }</h2>
      <p id="time-left">{ clockify(secondsLeft) }</p>
    </div>
  )
}