import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const TimerLengthControls = (props) => (
  <section className="timerlength-controls">
    <div className="break-controls">
      <h2 id="break-label">Break Length</h2>
      <div className="controls">
        <button id="break-decrement" onClick={props.handleDecrement}>
          <i><FaMinus /></i>
        </button>
        <span id="break-length">{props.breakLength}</span>
        <button id="break-increment" onClick={props.handleIncrement}>
          <i><FaPlus /></i>
        </button>
      </div>
    </div>
    <div className="session-controls">
      <h2 id="session-label">Session Length</h2>
      <div className="controls">
        <button id="session-decrement" onClick={props.handleDecrement}>
          <i><FaMinus /></i>
        </button>
        <span id="session-length">{props.sessionLength}</span>
        <button id="session-increment" onClick={props.handleIncrement}>
          <i><FaPlus /></i>
        </button>
      </div>
    </div>
  </section>
)