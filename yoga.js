let exerciseDurations = [];
let currentExercise = 0;
let isRunning = false;
let timer;
let remainingTime;
const restDuration = 20; // Rest period duration in seconds
const initialCountdown = 10; // Initial countdown duration in seconds
const dingTime = 4; // Time before the end to play ding sound (in seconds)

const setupDiv = document.getElementById('setup');
const exerciseInputsDiv = document.getElementById('exerciseInputs');
const startWorkoutButton = document.getElementById('startWorkoutButton');
const restartWorkoutButton = document.getElementById('restartWorkoutButton'); // New restart button
const timerElement = document.getElementById('timer');
const timerContainer = document.getElementById('timerContainer');
const smartWatchContainer = document.getElementById('smartWatchContainer'); // New Smart Watch container
const startSmartWatchButton = document.getElementById('startSmartWatchButton'); // New Start Smart Watch button
const endSmartWatchContainer = document.getElementById('endSmartWatchContainer'); // New End Smart Watch container

document.getElementById('setExercisesButton').addEventListener('click', setExercises);
startWorkoutButton.addEventListener('click', showStartSmartWatchPrompt);
startSmartWatchButton.addEventListener('click', startInitialCountdown); // New event listener for Start Smart Watch button
restartWorkoutButton.addEventListener('click', restartWorkout); // Event listener for restart button

function setExercises() {
    const numExercises = parseInt(document.getElementById('numExercises').value);
    exerciseInputsDiv.innerHTML = '';
    exerciseDurations = [];
    
    for (let i = 0; i < numExercises; i++) {
        const div = document.createElement('div');
        div.innerHTML = `
            <label for="exercise${i}">Duration of Exercise ${i + 1} (seconds):</label>
            <input type="number" id="exercise${i}" min="1">
        `;
        exerciseInputsDiv.appendChild(div);
    }
    
    startWorkoutButton.style.display = 'inline-block';
}

function showStartSmartWatchPrompt() {
    setupDiv.style.display = 'none';
    exerciseInputsDiv.style.display = 'none';
    startWorkoutButton.style.display = 'none';
    smartWatchContainer.style.display = 'block'; // Show Start Smart Watch container
}

function startInitialCountdown() {
    smartWatchContainer.style.display = 'none'; // Hide Start Smart Watch container
    timerContainer.style.display = 'block';

    remainingTime = initialCountdown;
    timerElement.textContent = `Starting in ${formatTime(remainingTime)}`;
    
    timer = setInterval(() => {
        remainingTime--;
        timerElement.textContent = `Starting in ${formatTime(remainingTime)}`;

        if (remainingTime === dingTime) {
            playDingSound();
        }
        
        if (remainingTime <= 0) {
            clearInterval(timer);
            startWorkout();
        }
    }, 1000);
}

function startWorkout() {
    const numExercises = parseInt(document.getElementById('numExercises').value);
    for (let i = 0; i < numExercises; i++) {
        const duration = parseInt(document.getElementById(`exercise${i}`).value);
        exerciseDurations.push(duration);
    }
    
    currentExercise = 0;
    startExerciseTimer(exerciseDurations[currentExercise]);
}

function startExerciseTimer(duration) {
    isRunning = true;
    remainingTime = duration;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();
        
        if (remainingTime === dingTime) {
            playDingSound();
        }

        if (remainingTime <= 0) {
            clearInterval(timer);
            isRunning = false;
            currentExercise++;
            if (currentExercise < exerciseDurations.length) {
                startRestTimer();
            } else {
                showWorkoutCompleteScreen();
            }
        }
    }, 1000);
}

function startRestTimer() {
    remainingTime = restDuration;
    timerElement.textContent = `Rest for ${formatTime(remainingTime)}`;
    
    timer = setInterval(() => {
        remainingTime--;
        timerElement.textContent = `Rest for ${formatTime(remainingTime)}`;
        
        if (remainingTime === dingTime) {
            playDingSound();
        }

        if (remainingTime <= 0) {
            clearInterval(timer);
            startExerciseTimer(exerciseDurations[currentExercise]);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = formatTime(remainingTime);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function playDingSound() {
    const audio = new Audio('ding.mp3'); // Make sure you have a 'ding.mp3' file in your project
    audio.play();
}

function showWorkoutCompleteScreen() {
    timerElement.textContent = "Workout Complete!";
    restartWorkoutButton.style.display = 'inline-block'; // Show the restart button
    endSmartWatchContainer.style.display = 'block'; // Show the End Smart Watch container
}

function restartWorkout() {
    clearInterval(timer); // Clear any running timer
    window.location.reload(); // Reload the page
}

function playYogaMusic() {
    const audio = new Audio('yoga-music.mp3'); // Make sure you have a 'yoga-music.mp3' file in your project
    audio.loop = true; // Loop the music
    audio.play();
}

// Play yoga music on page load
window.addEventListener('load', playYogaMusic);
