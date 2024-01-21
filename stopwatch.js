let startTime;
let isRunning = false;
let pausedTime = 0;
let laps = [];

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime() - pausedTime;
    isRunning = true;
    updateStopwatch();
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    pausedTime = calculateElapsedTime();
  }
}

function resumeStopwatch() {
  if (!isRunning) {
    startStopwatch();
  }
}

function resetStopwatch() {
  isRunning = false;
  pausedTime = 0;
  document.getElementById("stopwatch").textContent = "00:00:00";
  laps = [];
  updateLaps();
}

function recordLap() {
  if (isRunning) {
    const lapTime = calculateElapsedTime();
    laps.push(formatTime(lapTime));
    updateLaps();
  }
}

function updateStopwatch() {
  if (isRunning) {
    const elapsed = calculateElapsedTime();
    document.getElementById("stopwatch").textContent = formatTime(elapsed);
    setTimeout(updateStopwatch, 10);
  }
}

function calculateElapsedTime() {
  const currentTime = new Date().getTime();
  return currentTime - startTime;
}

function formatTime(time) {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const hours = Math.floor(time / 1000 / 60 / 60);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

function updateLaps() {
  const lapsContainer = document.querySelector("#laps ul");
  lapsContainer.innerHTML = "";

  laps.forEach((lap, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsContainer.appendChild(li);
  });
}
