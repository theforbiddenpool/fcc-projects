import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { FaPause, FaPlay, FaUndo } from 'react-icons/fa'

import { useAccurateInterval } from '../hooks/useAccurateInterval'

export const Timer = ({ sessionLength = 25, breakLength = 5, isTimerRunning, setIsTimerRunning, handleReset }) => {
  const [ timeLeft, setTimeLeft ] = useState(sessionLength * 60) // 25 minutes
  const [ label, setLabel ] = useState('Session')
  const [ minutesLabel, setMinutesLabel ] = useState()

  const beepSound = useRef(null)
  
  const { timer } = useAccurateInterval(() => setTimeLeft(timeLeft - 1))

  useLayoutEffect(() => {
    if(isTimerRunning) return

    if(label === 'Session') {
      setTimeLeft(sessionLength * 60)
      setMinutesLabel(clockify(sessionLength * 60))
    } else if(label === 'Break') {
      setTimeLeft(breakLength * 60)
      setMinutesLabel(clockify(breakLength * 60))
    }
  }, [sessionLength, breakLength])

  function handleStartStop() {
    if(isTimerRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  }

  function reset() {
    timer.stop()
    setLabel('Session')
    setTimeLeft(sessionLength * 60)
    beepSound.current.pause()
    beepSound.current.currentTime = 0
    handleReset()
  }

  useEffect(() => {
    setMinutesLabel(clockify())

    if(timeLeft < 0) {
      beepSound.current.play()

      if(label === 'Session') {
        setTimeLeft(breakLength * 60)
        setLabel('Break')
      } else if(label === 'Break') {
        setTimeLeft(sessionLength * 60)
        setLabel('Session')
      }
    }
  }, [timeLeft])

  function clockify(time = timeLeft) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function formatForPreecidingZero(number) {
      return (number < 10) ? `0${number}` : number
    }

    return `${formatForPreecidingZero(minutes)}:${formatForPreecidingZero(seconds)}`
  }

  function startTimer() {
    timer.start()
    setIsTimerRunning(true)
  }

  function stopTimer() {
    timer.stop()
    setIsTimerRunning(false)
  }
  
  return (
    <section className="timer">
      <div className="timer-display">
        <h2 id="timer-label">{label}</h2>
        <p id="time-left">{minutesLabel}</p>
      </div>
      <div className="timer-controls">
        <button id="start_stop" onClick={handleStartStop}>
          <i>
            { isTimerRunning ? <FaPause /> : <FaPlay />}
          </i>
        </button>
        <button id="reset" onClick={reset}>
          <i><FaUndo /></i>
        </button>
      </div>
      <audio ref={beepSound} id="beep" src="https://goo.gl/65cBl1"></audio>
    </section>
  )
}
