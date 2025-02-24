let sessionLength = 25;
let breakLength = 5;
let isRunning = false;
let isSession = true;
let timer;

const sessionLengthDisplay = document.getElementById('session-length');
const breakLengthDisplay = document.getElementById('break-length');
const timeLeftDisplay = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');

document.getElementById('start_stop').addEventListener('click', function() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

document.getElementById('reset').addEventListener('click', resetTimer);

document.getElementById('session-decrement').addEventListener('click', function() {
    if (sessionLength > 1) {
        sessionLength--;
        updateDisplay();
    }
});

document.getElementById('session-increment').addEventListener('click', function() {
    if (sessionLength < 60) {
        sessionLength++;
        updateDisplay();
    }
});

document.getElementById('break-decrement').addEventListener('click', function() {
    if (breakLength > 1) {
        breakLength--;
        updateDisplay();
    }
});

document.getElementById('break-increment').addEventListener('click', function() {
    if (breakLength < 60) {
        breakLength++;
        updateDisplay();
    }
});

function updateDisplay() {
    sessionLengthDisplay.textContent = sessionLength;
    breakLengthDisplay.textContent = breakLength;
    if (isSession) {
        timeLeftDisplay.textContent = formatTime(sessionLength * 60);
    } else {
        timeLeftDisplay.textContent = formatTime(breakLength * 60);
    }
}

function startTimer() {
    let currentTime = isSession ? sessionLength * 60 : breakLength * 60;
    isRunning = true;

    timer = setInterval(function() {
        currentTime--;
        timeLeftDisplay.textContent = formatTime(currentTime);

        if (currentTime <= 0) {
            clearInterval(timer);
            isSession = !isSession; // Switch between session and break
            timerLabel.textContent = isSession ? "Session" : "Break";
            startTimer(); // Start the next session or break automatically
            document.getElementById('beep').play(); // Play sound
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isSession = true;
    sessionLength = 25;
    breakLength = 5;
    updateDisplay();
    timerLabel.textContent = "Session";
    let sound = document.getElementById('beep');
    sound.pause();
    sound.currentTime = 0;
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

updateDisplay(); // Initial display update
