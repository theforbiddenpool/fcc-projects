import React, { useState, useEffect } from 'react';
import './App.scss';

import Buttons from './components/Buttons';
import Display from './components/Display'

const DECIMAL_PRECISION = 1000000000000

const App = () => {
  const [ displayValue, setDisplayValue ] = useState(0)
  const [ currentExpression, setCurrentExpression ] = useState('')
  const [ previousKeyClicked, setPreviousKeyClicked ] = useState(null)
  const [ isNumberNegative, setIsNumberNegative ] = useState(false)
  const [ isCalculationDone, setIsCalculationDone ] = useState(false)


  function handleDisplayClear(e) {
    let expression = ''
    setDisplayValue(0)

    if(e.currentTarget.id !== 'clear') {
      if(hasPreviousOperation()) {
        expression = removePreviousOperator()
      } else {
        for(let i = currentExpression.length-1; i > 0; i--) {
          if(/[/*+-]/.test(currentExpression[i])) {
            expression = currentExpression.slice(0, i + 1)
            break
          }
        }
      }
    }

    setCurrentExpression(expression)
  }

  function handleDisplayNumber(e) {
    const number = parseInt(e.currentTarget.value)

    if(number === 0 && previousKeyClicked === 0) return

    if(displayValue === 0) {
      setDisplayValue(`${number}`)
    } else {
      setDisplayValue(`${displayValue}${number}`)
    }
    
    setCurrentExpression(`${currentExpression}${number}`)
    setPreviousKeyClicked(number)
  }

  function handleOperation(e) {
    let operator = e.currentTarget.value
    let expression = currentExpression

    if(hasPreviousOperation()) {
      if(operator === '-' && !isNumberNegative) {
        operator = formatForNegativeNumbers(operator)
        setDisplayValue('-')
      } else {
        expression = removePreviousOperator()
        setDisplayValue(0)
      }
    } else {
      if(expression === '') {
        expression = 0
      }

      if(isNumberNegative) {
        operator = formatForNegativeNumbers(operator)
      }
      setDisplayValue(0) 
    }

    setCurrentExpression(expression + operator)
    setPreviousKeyClicked(operator)
  }

  function hasPreviousOperation() {
    return /[/*+-]$/.test(currentExpression)
  }

  function formatForNegativeNumbers(targetOperation) {
    if(isNumberNegative) {
      setIsNumberNegative(false)
      return `)${targetOperation}`
    } else {
      setIsNumberNegative(true)
      return `(${targetOperation}`
    }
  }

  function removePreviousOperator() {
    if(isNumberNegative) {
      setIsNumberNegative(false)
      return currentExpression.slice(0, currentExpression.length - 3)
    } else {
      return currentExpression.slice(0, currentExpression.length - 1)
    }
  }

  function handleDot() {
    if(hasDot()) return

    if(displayValue == 0 && previousKeyClicked !== 0)
      setCurrentExpression(currentExpression + '0.')
    else
      setCurrentExpression(currentExpression + '.')

    setDisplayValue(displayValue + '.')
    setPreviousKeyClicked('.')
  }

  function hasDot() {
    return /\./.test(displayValue)
  }

  function evaluteResult() {
    let expression = currentExpression
    
    if(expression === '') return
    
    if(hasPreviousOperation()) {
      expression = removePreviousOperator()
    } else if(isNumberNegative) {
      expression += ')'
    }
    
    const result = Math.round(DECIMAL_PRECISION * eval(expression)) / DECIMAL_PRECISION
    setCurrentExpression(expression)
    setDisplayValue(result)
    setPreviousKeyClicked('=')
    setIsCalculationDone(true)
  }

  function handleCalculationDone(e) {
    if(!isCalculationDone) return

    setDisplayValue(0)
    setPreviousKeyClicked(null)
    setIsNumberNegative(false)
    setIsCalculationDone(false)
    
    if(e.target.classList.contains('btn-operator')) {
      setCurrentExpression(`${displayValue}${e.target.value}`)
    } else if(e.target.classList.contains('btn-number')) {
      setDisplayValue(e.target.value)
      setCurrentExpression(e.target.value)
    } else {
      setCurrentExpression('')
    }
    setPreviousKeyClicked(e.target.value)
  }

  return (
    <main id="calculator" onClick={handleCalculationDone}>
      <Display expression={currentExpression} number={displayValue} />
      <Buttons handleButtonNumber={handleDisplayNumber} handleButtonClear={handleDisplayClear} handleButtonOperation={handleOperation} handleButtonDot={handleDot} handleButtonEquals={evaluteResult} />
    </main>
  )
}

export default App