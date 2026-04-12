const targetDateInput = document.getElementById("targetDate");
const startBtn = document.getElementById("startBtn");
const countdownDisplay = document.getElementById("countdownDisplay");
const finishedMessage = document.getElementById("finishedMessage");
const resetBtn = document.getElementById("resetBtn");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval = null;

// ── Format date for the input (default to tomorrow) ──
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);
// Format to YYYY-MM-DDTHH:MM for datetime-local
const formattedDate = tomorrow.toISOString().slice(0, 16);
targetDateInput.value = formattedDate;
targetDateInput.min = new Date().toISOString().slice(0, 16);

// ── Start Countdown ──
startBtn.addEventListener("click", () => {
  const targetValue = targetDateInput.value;
  if (!targetValue) {
    alert("Please select a target date!");
    return;
  }

  const targetDate = new Date(targetValue);
  if (targetDate <= new Date()) {
    alert("Please select a future date!");
    return;
  }

  countdownDisplay.classList.add("active");

  // Reset display to default date
  clearInterval(countdownInterval);
  
  daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";

  // Start the interval
  updateCountdown(targetDate);
  countdownInterval = setInterval(() =>
    updateCountdown(targetDate)
  , 1000);
});

// ── Update Countdown ──
function updateCountdown(targetDate) {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    countdownDisplay.classList.remove("active");
    finishedMessage.classList.add("active");
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// ── Reset ──
resetBtn.addEventListener("click", () => {
//   clearInterval(countdownInterval);

  finishedMessage.classList.remove("active");
  countdownDisplay.classList.remove("active");

  // Reset display to default date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  targetDateInput.value = tomorrow.toISOString().slice(0, 16);

  daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
});
