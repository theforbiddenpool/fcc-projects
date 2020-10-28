import React from 'react'
import { FaMinus, FaPlus, FaPause, FaPlay, FaUndo } from 'react-icons/fa'

export const LengthControl = ({ id, label, length, handleChange }) => (
  <div className="length-control">
    <h2 id={ `${id}-label` } class="control-label">{ label }</h2>
    <div className="controls">
      <button data-value="-1" id={ `${id}-decrement` } onClick={ handleChange }>
        <i><FaMinus /></i>
      </button>
      <span id={ `${id}-length` }>{ length }</span>
      <button data-value="1" id={ `${id}-increment` } onClick={ handleChange }>
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