let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false, laps = [];

const display = document.getElementById('display');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
lapCount=0

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    display.innerHTML = '00:00:00:00';
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        lapCount++;
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${lapCount}: ${display.innerHTML}`;
        lapsList.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 100;

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? (milliseconds < 10 ? "0" + milliseconds : "" ) : milliseconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
    millisecondsDisplay.innerHTML = milliseconds;
}
