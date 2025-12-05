import styles from './Calculator.module.css'
import {useState} from 'react';
import BigButton from './BigButton.jsx';
import Display from './Display.jsx';
import Button from './Button.jsx';

export default function Calculator() {

  const [screen, setScreen] = useState('0123456789.abcde');
  const [firstOperand, setFirstOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [secondOperand, setSecondOperand] = useState('');
  const [showingResult, setShowingResult] = useState(false);

  function handleButtonClick(event) {
    console.log(event);
  }

  function handleClearAll() {
    setScreen('');
    setFirstOperand('');
    setOperator('');
    setSecondOperand('');
    setShowingResult(false);
  }

  function handleBackspace() {
    setScreen(prev => {
      if (screen.length > 0) {
        return screen.slice(0, -1)
      } else {
        return prev;
      }
    })
  }

  function attemptOp(a, op, b = 0) {
    if ( op == '/' && Number(b) == 0) {
      alert('No dividing by zero!');
      handleClearAll();
      return;
    } 
    let result;
    let x = Number(a);
    let y = Number(b);
    switch (op) {
      case 'sqr':
        result = x ** 2;
        break;
      case 'sqrt':
        result = x ** 0.5;
        break;
      case 'inv':
        result = x ** -1;
        break;
      case 'exp':
        result = x ** y;
        break;
      case '/':
        result = x / y;
        break;
      case '*':
        result = x * y;
        break;
      case '-':
        result = x - y;
        break;
      case '+':
        result = x + y;
        break;
      default:
        return NaN;
    }
    if (String(result).length > 14) {
      result = result.toPrecision(14);
    }
    setScreen(result);
    setShowingResult(true);
    setFirstOperand('');
    setOperator('');
  }

  function prepareOp(operand, op) {
    if (
      Number.isFinite(firstOperand) &&
      op &&
      screen != ''
    ) {
      attemptOp(firstOperand, op, screen);
      setFirstOperand(screen);
      setOperator(op);
      return;
    } else if (
      Number.isFinite(firstOperand) &&
      operator == op &&
      screen == ''
    ) {
      return;
    } else {
      setFirstOperand(Number(operand));
      setOperator(op);
      setScreen('');
    }
  }

  function handleButtonClick(e, value) {
    switch(value){
      case 'sqr':
      case 'sqrt':
      case 'inv':
        if (screen != '') {
          attemptOp(screen, value)
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case 'exp':
        if (screen != '') {
          prepareOp(screen, value)
        }
        break;
      case '=':
        if (Number.isFinite(firstOperand) &&
            operator &&
            screen != '') {
          attemptOp(firstOperand, operator, screen)    
        }
        break;
      case '.':
        if (
          !(screen.includes('.')) &&
          screen != '' &&
          screen.length < 13
        )  {
          setScreen(prev => prev + '.');
        }
        break;
      default:
        setScreen(prev => {
          if (showingResult) {
            prev = '';
            setShowingResult(false)
          }
          return prev + value;
        })
    }
  }

  function renderButtons() {
    const buttonLayout = [
      'sqr', 'sqrt', 'inv', 'exp',
      '7', '8', '9', '/',
      '4', '5', '6', '*',
      '1', '2', '3', '-',
      '.', '0', '=', '+'
    ]

    return (
      <>
        {buttonLayout.map((value, index) => (
          <Button 
            key={index}
            value={value}
            onClick={(e) => handleButtonClick(e, value)}
          />
        ))}
      </>
    )
  }

  return (
    <div id="calcframe" className={styles.calcframe}>
      <Display
        value = {screen}
      />
      
      <div className={styles.buttongrid}>
        <BigButton 
          value='ClearAll'
          style={{gridColumn: '1 / span 2'}}
          onClick={handleClearAll}
        />
        <BigButton 
          value='Backspace'
          style={{gridColumn: '3 / span 2'}}
          onClick={handleBackspace}
        />
        {renderButtons()}
      </div>
    </div>
  )
}