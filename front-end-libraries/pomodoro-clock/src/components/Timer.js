import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { FaPause, FaPlay, FaUndo } from 'react-icons/fa'

import { useAccurateInterval } from '../hooks/useAccurateInterval'
import { Display } from './Display'

export const Timer = ({ sessionLength = 25, breakLength = 5, isTimerRunning, setIsTimerRunning, handleReset }) => {
  const [ secondsLeft, setSecondsLeft ] = useState(sessionLength * 60) // 25 minutes
  const [ label, setLabel ] = useState('Session')

  const beepSound = useRef(null)
  
  const { timer } = useAccurateInterval(() => setSecondsLeft(secondsLeft - 1))

  useLayoutEffect(() => {
    if(isTimerRunning) return

    if(label === 'Session') {
      setSecondsLeft(sessionLength * 60)
    } else if(label === 'Break') {
      setSecondsLeft(breakLength * 60)
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
      <Display label={ label } secondsLeft={ secondsLeft } />
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
