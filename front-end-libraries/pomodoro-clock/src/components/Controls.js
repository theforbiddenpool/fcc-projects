import React from 'react'
import { FaMinus, FaPlus, FaPause, FaPlay, FaUndo } from 'react-icons/fa'

export const LengthControl = ({ id, label, length, handleChange }) => (
  <div className="length-control">
    <h2 id={ `${id}-label` } className="control-label">{ label }</h2>
    <div className="controls" aria-live="polite">
      <button data-value="-1" id={ `${id}-decrement` } onClick={ handleChange } aria-label={`decrement`} disabled={(length === 1)}>
        <i><FaMinus /></i>
      </button>
      <span id={ `${id}-length` }>{ length }</span>
      <button data-value="1" id={ `${id}-increment` } onClick={ handleChange } aria-label={`increment`} disabled={(length === 60)}>
        <i><FaPlus /></i>
      </button>
    </div>
  </div>
)

export const TimerControls = ({ handleStartStop, isIntervalRunning, handleReset }) => (
  <div className="timer-controls">
    <button id="start_stop" onClick={ handleStartStop } aria-label={isIntervalRunning ? 'stop timer' : 'start timer'}>
      <i>
        { isIntervalRunning ? <FaPause /> : <FaPlay /> }
      </i>
    </button>
    <button id="reset" onClick={ handleReset } aria-label="reset timer">
      <i><FaUndo /></i>
    </button>
  </div>
)