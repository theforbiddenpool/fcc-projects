import React from 'react'
import { FaMinus, FaPlus, FaPause, FaPlay, FaUndo } from 'react-icons/fa'

export const LengthControl = ({ label, length, handleChange }) => (
  <div className="length-control">
    <h2 id="length-label">{ label }</h2>
    <div className="controls">
      <button data-value="-1" onClick={ handleChange }>
        <i><FaMinus /></i>
      </button>
      <span id="length-length">{ length }</span>
      <button data-value="1" onClick={ handleChange }>
        <i><FaPlus /></i>
      </button>
    </div>
  </div>
)

export const TimerControls = ({ handleStartStop, isIntervalRunning, handleReset }) => (
  <div className="timer-controls">
    <button id="start_stop" onClick={ handleStartStop }>
      <i>
        { isIntervalRunning ? <FaPause /> : <FaPlay /> }
      </i>
    </button>
    <button id="reset" onClick={ handleReset }>
      <i><FaUndo /></i>
    </button>
  </div>
)