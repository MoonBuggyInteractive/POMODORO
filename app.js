// DOM elements
var timerDisplay = document.getElementById('timer-display');
var scoreDisplay = document.getElementById('score-display');
var startButton = document.getElementById('start-button');
var pauseButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');

// Initialize state
var score = 0;
var timeRemaining = 25 * 60; // 25 minutes in seconds
var timerInterval = null;

// Load the score from localStorage when the page loads
if (localStorage.getItem('score')) {
    score = parseInt(localStorage.getItem('score'));
    scoreDisplay.textContent = score;
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Function to start the timer
function startTimer() {
    // If the timer is already running, do not start another timer
    if (timerInterval !== null) return;

    timerInterval = setInterval(function() {
        timeRemaining -= 0.1;

        // If the time is up, reset the timer
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timeRemaining = 25 * 60;

            // Save the score to localStorage
            localStorage.setItem('score', score);
        }

        // Update the timer display
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining % 60);
        timerDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        // Add 1 point to the score every 100 milliseconds
        score += 1;
        scoreDisplay.textContent = score;

    }, 100);
}

// Function to pause the timer
function pauseTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Function to reset the time
function resetTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeRemaining = 25 * 60;
    timerDisplay.textContent = '25:00';
    // The score is not reset here, as per your earlier request
}
