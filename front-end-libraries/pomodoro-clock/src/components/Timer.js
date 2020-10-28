import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { FaPause, FaPlay, FaUndo } from 'react-icons/fa'

import { useAccurateInterval } from '../hooks/useAccurateInterval'
import { Display } from './Display'

export const Timer = ({ sessionLength = 25, breakLength = 5, handleReset }) => {
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60) // 25 minutes
  const [label, setLabel] = useState('Session')

  const beepSound = useRef(null)
  
  const { startInterval, stopInterval, isIntervalRunning } = useAccurateInterval(() => setSecondsLeft(secondsLeft - 1))

  // I'm using layoutEffect here because otherwise it won't pass the FCC tests
  useLayoutEffect(() => {
    if(isIntervalRunning) return

    if(label === 'Session') {
      setSecondsLeft(sessionLength * 60)
    } else if(label === 'Break') {
      setSecondsLeft(breakLength * 60)
    }
  }, [sessionLength, breakLength])

  function handleStartStop() {
    if(isIntervalRunning) {
      stopInterval()
    } else {
      startInterval()
    }
  }

  function reset() {
    stopInterval()
    setLabel('Session')
    setSecondsLeft(sessionLength * 60)
    beepSound.current.pause()
    beepSound.current.currentTime = 0
    handleReset()
  }

  useEffect(() => {
    if(secondsLeft < 0) {
      beepSound.current.play()

      if(label === 'Session') {
        setSecondsLeft(breakLength * 60)
        setLabel('Break')
      } else if(label === 'Break') {
        setSecondsLeft(sessionLength * 60)
        setLabel('Session')
      }
    }
  }, [secondsLeft])
  
  return (
    <section className="timer">
      <Display label={ label } secondsLeft={ secondsLeft } />
      <div className="timer-controls">
        <button id="start_stop" onClick={handleStartStop}>
          <i>
            { isIntervalRunning ? <FaPause /> : <FaPlay />}
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
