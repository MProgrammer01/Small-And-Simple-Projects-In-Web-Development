// Select the toggle input
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]',
);
const body = document.body;

// Function to switch theme
function switchTheme(e) {
  if (e.target.checked) {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  }
}

// Event listener
toggleSwitch.addEventListener("change", switchTheme);

// Check for saved user preference on load
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  if (currentTheme === "light") {
    body.classList.add("light-mode");
    toggleSwitch.checked = true;
  }
}
