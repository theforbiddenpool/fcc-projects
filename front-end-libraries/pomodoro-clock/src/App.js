import React, { useState } from 'react';
import './App.scss';

import { Timer } from './components/Timer';
import { TimerLengthControls } from './components/TimerLengthControls';

const App = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  function decrement(e) {
    const elId = e.currentTarget.id

    changeLength(elId, -1)
  }

  function increment(e) {
    const elId = e.currentTarget.id

    changeLength(elId, 1)
  }

  function changeLength(elId, number) {
    if(isTimerRunning) return

    if(elId.includes('break')) {
      if((number > 0 && breakLength >= 60) || (number < 0 && breakLength <= 1)) return
      setBreakLength(breakLength + number)
    } else if(elId.includes('session')) {
      if((number > 0 && sessionLength >= 60) || (number < 0 && sessionLength <= 1)) return
      setSessionLength(sessionLength + number)
    }
  }

  function reset() {
    setSessionLength(25)
    setBreakLength(5)
    setIsTimerRunning(false)
  }

  return (
    <div className="page-wrapper">
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <TimerLengthControls sessionLength={sessionLength} breakLength={breakLength} handleDecrement={decrement} handleIncrement={increment} />
      <Timer sessionLength={sessionLength} breakLength={breakLength} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} handleReset={reset} />
    </div>
  )
}

export default App;
