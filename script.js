let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

// Append number to display
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput === '') {
        previousInput = currentInput;
    } else if (operation) {
        // If there's already an operation pending, calculate it first
        calculate();
        previousInput = display.value;
    }
    
    operation = op;
    shouldResetDisplay = true;
}

// Handle decimal point
function handleDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
    }
    updateDisplay();
}

// Delete last character
function deleteLast() {
    if (!shouldResetDisplay) {
        currentInput = currentInput.toString().slice(0, -1);
    }
    updateDisplay();
}

// Clear display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Calculate result
function calculate() {
    if (operation === null || previousInput === '' || currentInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Update display
function updateDisplay() {
    if (currentInput === '') {
        display.value = '0';
    } else {
        display.value = currentInput;
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-') {
        event.preventDefault();
        appendOperator(event.key);
    } else if (event.key === '*') {
        event.preventDefault();
        appendOperator(event.key);
    } else if (event.key === '/') {
        event.preventDefault();
        appendOperator(event.key);
    } else if (event.key === '.') {
        event.preventDefault();
        handleDecimal();
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (event.key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();