let screenConstant = '0';
let runningTotal =  0 ;
let lastOperator = '';
let isEqual = false;
const display = document.querySelector('.display');

document.querySelector(".calc-buttons").addEventListener('click', function(event){
    buttonClick(event.target.innerText);
    
});

function rerender(){
    const outputLength = screenConstant.length;
    const lastChar = screenConstant[outputLength - 1];
    let output = '';
//lastChar cos of '.'
    if (lastChar !== '.') {
        output = Math.round((parseFloat(screenConstant) + Number.EPSILON) * 10000) / 10000;
    } else {
        output = screenConstant;
    }

    display.innerText = '' + output;
    console.log('okay');
}

rerender();

function buttonClick(value){
    if (value === '.') {
        handleFloatingPoint(value);
    } else if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    console.log('okay1');
    rerender();
}

function handleFloatingPoint(value) {
    if (isEqual) {
        isEqual = false;
        screenConstant = "0";
    }

    if (!screenConstant.includes(value)) {
        screenConstant += value;
    }
}

function handleNumber(value) {
    if (isEqual) {
        isEqual = false;
        screenConstant = "0";
    }
    
    if (screenConstant === "0" || ((lastOperator || !screenConstant.includes('.')) && screenConstant == runningTotal)) {
        screenConstant = value;
    } else {
        screenConstant += value;
    }
    console.log('okay2');
}

function handleSymbol(value){
    isEqual = false;
    switch (value) {
        case 'AC':
        screenConstant = '0';
        runningTotal = 0;
        lastOperator = null;
            break;
            
        case 'DEL':
            if(screenConstant.length === 1){
                screenConstant ='0';
            }else {
                screenConstant = screenConstant.substring(0, screenConstant.length -1);
            }            
            break;
        case '%':
            isEqual = true;
            console.log(lastOperator, screenConstant, runningTotal);
            if (lastOperator) {
                flush(parseFloat(screenConstant));
                lastOperator = '%';
                flush(parseFloat(runningTotal));
            } else {
                lastOperator = '%';
                flush(parseFloat(screenConstant));
            }
            screenConstant = '' + runningTotal;
            lastOperator = null;
            break;

        case '=':
            isEqual = true;
            if(!lastOperator) {
                return;
            }
            flush(parseFloat(screenConstant));
            screenConstant = '' + runningTotal;
            runningTotal = 0;
            lastOperator = null;
            break;
        default:
            handleMath(value);
            break;
    }
}

function flush(intscreenConstant) {
    if(lastOperator === '+'){
        runningTotal += intscreenConstant;
    } else if(lastOperator === '-'){
        runningTotal -= intscreenConstant;
    } else if(lastOperator === '*'){
        runningTotal *= intscreenConstant;
    } else if (lastOperator === '/') {
        runningTotal /= intscreenConstant;        
     } else if (lastOperator === '%') {
        const percent = (intscreenConstant / 100);
        console.log(percent, intscreenConstant);
        runningTotal =  percent;
    }

}

function handleMath(value){
    const intscreenConstant = parseFloat(screenConstant);
    if(runningTotal === 0){
        runningTotal = intscreenConstant;
    } else{
        flush(intscreenConstant);
    }
    lastOperator = value;
    screenConstant = '' + runningTotal;
}
