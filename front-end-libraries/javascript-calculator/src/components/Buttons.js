import React from 'react'

const Buttons = (props) => (
  <section className="buttons-wrapper">
    <button className="calc-btn" id="clear" onClick={props.handleButtonClear}>AC</button>
    <button className="calc-btn" onClick={props.handleButtonClear}>CE</button>
    <button className="calc-btn btn-operator" value="/" id="divide" onClick={props.handleButtonOperation}>/</button>
    <button className="calc-btn btn-operator" value="*" id="multiply" onClick={props.handleButtonOperation}>×</button>
    <button className="calc-btn btn-number" value="7" id="seven" onClick={props.handleButtonNumber}>7</button>
    <button className="calc-btn btn-number" value="8" id="eight" onClick={props.handleButtonNumber}>8</button>
    <button className="calc-btn btn-number" value="9" id="nine" onClick={props.handleButtonNumber}>9</button>
    <button className="calc-btn btn-operator" value="-" id="subtract" onClick={props.handleButtonOperation}>-</button>
    <button className="calc-btn btn-number" value="4" id="four" onClick={props.handleButtonNumber}>4</button>
    <button className="calc-btn btn-number" value="5" id="five" onClick={props.handleButtonNumber}>5</button>
    <button className="calc-btn btn-number" value="6" id="six" onClick={props.handleButtonNumber}>6</button>
    <button className="calc-btn btn-operator" value="+" id="add" onClick={props.handleButtonOperation}>+</button>
    <button className="calc-btn btn-number" value="1" id="one" onClick={props.handleButtonNumber}>1</button>
    <button className="calc-btn btn-number" value="2" id="two" onClick={props.handleButtonNumber}>2</button>
    <button className="calc-btn btn-number" value="3" id="three" onClick={props.handleButtonNumber}>3</button>
    <button className="calc-btn" id="equals" onClick={props.handleButtonEquals}>=</button>
    <button className="calc-btn btn-number" value="0" id="zero" onClick={props.handleButtonNumber}>0</button>
    <button className="calc-btn" value="." id="decimal" onClick={props.handleButtonDot}>.</button>
  </section>
)

export default Buttons