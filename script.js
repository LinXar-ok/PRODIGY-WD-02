let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const hrDisplay = document.getElementById("hr");
const minDisplay = document.getElementById("min");
const secDisplay = document.getElementById("sec");
const miliSecDisplay = document.getElementById("miliSec");
const lapList = document.querySelector(".lap-times");

function timeFormat(time) {
  const milliseconds = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");

  return { hours, minutes, seconds, milliseconds };
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  const formattedTime = timeFormat(elapsedTime);
  hrDisplay.textContent = formattedTime.hours;
  minDisplay.textContent = formattedTime.minutes;
  secDisplay.textContent = formattedTime.seconds;
  miliSecDisplay.textContent = formattedTime.milliseconds;
}

function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
  lapButton.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  laps = [];
  hrDisplay.textContent = "00";
  minDisplay.textContent = "00";
  secDisplay.textContent = "00";
  miliSecDisplay.textContent = "00";
  lapList.innerHTML = "";
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapButton.disabled = true;
}

function lapRecord() {
  const lapTime = timeFormat(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${laps.length + 1}: ${lapTime.hours}:${
    lapTime.minutes
  }:${lapTime.seconds}:${lapTime.milliseconds}`;
  lapList.appendChild(lapItem);
  laps.push(lapTime);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", lapRecord);

pauseButton.disabled = true;
lapButton.disabled = true;
resetTimer();
