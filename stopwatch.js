const startStopBtn = document.getElementById('start_button');
const lapBtn = document.getElementById('lap_button');
const resetBtn = document.getElementById('reset_button');

const secDisplay = document.getElementById('seconds');
const msecDisplay = document.getElementById('milli_seconds');
const lapTimes = document.getElementById('lap_times');

let isRunning = false;
let msecInterval, secInterval;
let startTime;
let elapsedPausedTime = 0;

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

document.addEventListener('keydown', keyHandler);

function startStop() {
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
    secDisplay.innerText = '00';
    lapTimes.innerText = '';
    elapsedPausedTime = 0;
    isRunning = false;
}

function lap() {
    if(isRunning) {
        const aLapTime = document.createElement("li");
        const lapSecDisplay = document.createElement("span");
        const whiteSpace = document.createTextNode(" ");
        const lapMsecDisplay = document.createElement("span");
        lapSecDisplay.innerText = secDisplay.innerText;
        lapMsecDisplay.innerText = msecDisplay.innerText;
        aLapTime.appendChild(lapSecDisplay);
        aLapTime.appendChild(whiteSpace);
        aLapTime.appendChild(lapMsecDisplay);
        lapTimes.appendChild(aLapTime);
    }
}

function updateMsecDisplay() {
    let msec = (new Date().getTime() - startTime) % 1000;
    msecDisplay.innerText = msec.toString().padStart(3, '0');
}

function updateSecDisplay() {
    let sec = Math.round((new Date().getTime() - startTime) / 1000);
    secDisplay.innerText = sec.toString().padStart(2, '0');
}

function keyHandler(event) {
    if(event.keyCode == 32) startStop();
    if(event.keyCode == 76) lap();
    if(event.keyCode == 82) reset();
}