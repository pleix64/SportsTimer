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

if(localStorage.length != 0) {
    isRunning = JSON.parse(localStorage.getItem('isRunning'));
    startTime = Number(localStorage.getItem('startTime'));
    elapsedPausedTime = Number(localStorage.getItem('elapsedPausedTime'));
    msecDisplay.innerText = localStorage.getItem('milliSeconds');
    secDisplay.innerText = localStorage.getItem('seconds');
    if(isRunning) {
        msecInterval = setInterval(updateMsecDisplay, 1);
        secInterval = setInterval(updateSecDisplay, 1000);
    }
    const lapsData = localStorage.getItem('laps');
    if(lapsData !== null) {
        const laps = JSON.parse(lapsData);
        laps.forEach(appendLap);
    }
}

function startStop() {
    if(!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - elapsedPausedTime;
        msecInterval = setInterval(updateMsecDisplay, 1);
        secInterval = setInterval(updateSecDisplay, 1000);

        saveDataItem('isRunning', isRunning);
        saveDataItem('startTime', startTime);
    }
    else {
        isRunning = false;
        elapsedPausedTime = new Date().getTime() - startTime;
        clearInterval(msecInterval);
        clearInterval(secInterval);

        saveDataItem('isRunning', isRunning);
        saveDataItem('elapsedPausedTime', elapsedPausedTime);
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
    localStorage.clear();
}

function lap() {
    if(isRunning) {
        const aLap = {
            seconds: secDisplay.innerText,
            milliSeconds: msecDisplay.innerText
        }
        appendLap(aLap);

        if(localStorage.getItem('laps') == null) {
            localStorage.setItem('laps', '[]');
        }
        const laps = JSON.parse(localStorage.getItem('laps'));
        laps.push(aLap);
        localStorage.setItem('laps', JSON.stringify(laps));
    }
}

function updateMsecDisplay() {
    let msec = (new Date().getTime() - startTime) % 1000;
    msecDisplay.innerText = msec.toString().padStart(3, '0');

    saveDataItem('milliSeconds', msecDisplay.innerText);
}

function updateSecDisplay() {
    let sec = Math.round((new Date().getTime() - startTime) / 1000);
    secDisplay.innerText = sec.toString().padStart(2, '0');

    saveDataItem('seconds', secDisplay.innerText);
}

function appendLap(aLap) {
    console.log('a lap record is displayed.');
    const aLapTime = document.createElement("li");
    const lapSecDisplay = document.createElement("span");
    const whiteSpace = document.createTextNode(" ");
    const lapMsecDisplay = document.createElement("span");
    lapSecDisplay.innerText = aLap.seconds;
    lapMsecDisplay.innerText = aLap.milliSeconds;
    aLapTime.appendChild(lapSecDisplay);
    aLapTime.appendChild(whiteSpace);
    aLapTime.appendChild(lapMsecDisplay);
    lapTimes.appendChild(aLapTime);
}

function saveDataItem(key, value) {
    localStorage.setItem(key, value.toString());
}

function keyHandler(event) {
    if(event.keyCode == 32) startStop();
    if(event.keyCode == 76) lap();
    if(event.keyCode == 82) reset();
}