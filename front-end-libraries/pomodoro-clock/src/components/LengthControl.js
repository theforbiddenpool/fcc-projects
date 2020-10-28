import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

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