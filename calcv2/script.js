function goBack() {
    window.history.back();
}

let buffer = '0';
let operatoreprecedente = null;
let totale = 0;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            totale = 0;
            break;
        case '=':
            if (operatoreprecedente === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            operatoreprecedente = null;
            buffer = totale;
            totale = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (totale === 0) {
        totale = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    operatoreprecedente = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (operatoreprecedente === '+') {
        totale += intBuffer;
    } else if (operatoreprecedente === '-') {
        totale -= intBuffer;
    } else if (operatoreprecedente === '×') {
        totale *= intBuffer;
    } else if (operatoreprecedente === '÷') {
        totale /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();
