let startStopBtn = document.getElementById('start_button');
let resetBtn = document.getElementById('reset_button');
let secDisply = document.getElementById('seconds');
let msecDisplay = document.getElementById('milli_seconds');

let isRunning = false;
let msecInterval, secInterval;
let startTime;
let elapsedPausedTime = 0;

console.log(document);
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

function startStop() {
    console.log(isRunning);
    if(!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - elapsedPausedTime;
        msecInterval = setInterval(updateMsecDisplay, 1);
        secInterval = setInterval(updateSecDisplay, 1000);
    }
    else {
        isRunning = false;
        elapsedPausedTime = new Date().getTime() - startTime;
        clearInterval(msecInterval);
        clearInterval(secInterval);
    }
}

function reset() {
    clearInterval(msecInterval);
    clearInterval(secInterval);
    msecDisplay.innerText = '000';
    secDisply.innerText = '00';
    elapsedPausedTime = 0;
    isRunning = false;
}

function updateMsecDisplay() {
    let msec = (new Date().getTime() - startTime) % 1000;
    msecDisplay.innerText = msec.toString().padStart(3, '0');
}

function updateSecDisplay() {
    let sec = Math.round((new Date().getTime() - startTime) / 1000);
    secDisply.innerText = sec.toString().padStart(2, '0');
}