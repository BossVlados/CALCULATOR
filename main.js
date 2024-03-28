let result = document.getElementById('display');
let currentOperator = '';
let firstOperand = '';
let secondOperand = '';
const operators = ['+', '-', '*', '/', '%'];

function appendToResult(value) {
  if (value === '.' && result.value.includes('.')) {
    return;
  }

  if (currentOperator === '') {
    firstOperand += value;
  } else {
    secondOperand += value;
  }

  result.value += value;
}

function allClear() {
  result.value = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = '';
}

function removeLast() {
  if (result.value.length > 0) {
    let removedChar = result.value.slice(-1);
    if (currentOperator === '') {
      firstOperand = firstOperand.slice(0, -1);
    } else {
      secondOperand = secondOperand.slice(0, -1);
    }
    result.value = result.value.slice(0, -1);
  }
}

function calculate() {
  if (firstOperand !== '' && secondOperand !== '' && currentOperator !== '') {
    let resultValue;
    switch (currentOperator) {
      case '+':
        resultValue = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '-':
        resultValue = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case '*':
        resultValue = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '/':
        if ((secondOperand = '0')) {
          resultValue = 'Ошибка';
          firstOperand = '';
          secondOperand = '';
          currentOperator = '';
        } else {
          resultValue = parseFloat(firstOperand) / parseFloat(secondOperand);
        }
        break;
      default:
        resultValue = '';
    }
    result.value = resultValue;
    firstOperand = resultValue.toString();
    secondOperand = '';
    currentOperator = '';
  }
}

function calculatePercentage() {
  if (firstOperand !== '' && currentOperator === '') {
    result.value = parseFloat(firstOperand) / 100;
    firstOperand = result.value.toString();
  } else if (secondOperand !== '') {
    result.value = parseFloat(secondOperand) / 100;
    secondOperand = result.value.toString();
  }
}

function setOperator(operator) {
  if (firstOperand !== '' && secondOperand !== '' && currentOperator !== '') {
    calculate();
  }

  currentOperator = operator;

  if (
    result.value.endsWith('+') ||
    result.value.endsWith('-') ||
    result.value.endsWith('*') ||
    result.value.endsWith('/') ||
    result.value.endsWith('%')
  ) {
    result.value = result.value.slice(0, -1);
  }

  result.value += operator;
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (
    !isNaN(key) ||
    key === '.' ||
    key === '+' ||
    key === '-' ||
    key === '*' ||
    key === '/' ||
    key === '%'
  ) {
    if (event.type === 'keydown') {
      appendToResult(key);
    }
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    removeLast();
  }
});
