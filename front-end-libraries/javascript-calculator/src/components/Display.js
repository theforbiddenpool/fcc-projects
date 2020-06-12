import React from 'react'

const Display = (props) => (
  <section className="display">
    <div className="expression">{props.expression}</div>
    <div className="number" id="display">{props.number}</div>
  </section>
)

export default Display
