let startStopBtn = document.getElementById('start_button');
let resetBtn = document.getElementById('reset_button');
let secDisply = document.getElementById('seconds');
let msecDisplay = document.getElementById('milli_seconds');

let isRunning = false;
let intervalID;
let startTime;

console.log(document);
startStopBtn.addEventListener('click', startStop);

function startStop() {
    console.log(isRunning);
    if(!isRunning) {
        startTime = new Date().getTime();
        intervalID = setInterval(updateDisplay, 1);
    }

}

function reset() {

}

function updateDisplay() {
    let msec = new Date().getTime() - startTime;
    msecDisplay.innerText = msec.toString().padStart(3, '0');
}