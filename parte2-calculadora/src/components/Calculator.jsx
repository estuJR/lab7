import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')

  const handleClick = (value) => {
    if (display === '0' && !['+', '-', '*', '/', '.'].includes(value)) {
      setDisplay(value)
      setExpression(value)
    } else if (display === 'Error') {
      setDisplay(value)
      setExpression(value)
    } else {
      setDisplay(display + value)
      setExpression(expression + value)
    }
  }

  const clearDisplay = () => {
    setDisplay('0')
    setExpression('')
  }

  const deleteLast = () => {
    if (display.length === 1 || display === 'Error') {
      setDisplay('0')
      setExpression('')
    } else {
      setDisplay(display.slice(0, -1))
      setExpression(expression.slice(0, -1))
    }
  }

  const calculate = () => {
    try {
      // eslint-disable-next-line no-new-func
      const result = Function('"use strict"; return (' + expression + ')')()
      if (result === Infinity || result === -Infinity || isNaN(result)) {
        setDisplay('Error')
        setExpression('')
      } else {
        const formatted = String(result)
        setDisplay(formatted)
        setExpression(formatted)
      }
    } catch {
      setDisplay('Error')
      setExpression('')
    }
  }

  const buttons = [
    { label: 'C', type: 'clear', action: clearDisplay },
    { label: '⌫', type: 'function', action: deleteLast },
    { label: '%', type: 'operator', action: () => handleClick('%') },
    { label: '÷', type: 'operator', action: () => handleClick('/') },
    { label: '7', type: 'number', action: () => handleClick('7') },
    { label: '8', type: 'number', action: () => handleClick('8') },
    { label: '9', type: 'number', action: () => handleClick('9') },
    { label: '×', type: 'operator', action: () => handleClick('*') },
    { label: '4', type: 'number', action: () => handleClick('4') },
    { label: '5', type: 'number', action: () => handleClick('5') },
    { label: '6', type: 'number', action: () => handleClick('6') },
    { label: '−', type: 'operator', action: () => handleClick('-') },
    { label: '1', type: 'number', action: () => handleClick('1') },
    { label: '2', type: 'number', action: () => handleClick('2') },
    { label: '3', type: 'number', action: () => handleClick('3') },
    { label: '+', type: 'operator', action: () => handleClick('+') },
    { label: '0', type: 'number wide', action: () => handleClick('0') },
    { label: '.', type: 'number', action: () => handleClick('.') },
    { label: '=', type: 'equals', action: calculate },
  ]

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h2>Calc</h2>
        <span className="badge">React</span>
      </div>
      <div className="display">
        <div className="expression">{expression || '\u00A0'}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={`btn ${btn.type}`}
            onClick={btn.action}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="footer">
        <p>Javier Alvizures · Lab 7</p>
      </div>
    </div>
  )
}

export default Calculator